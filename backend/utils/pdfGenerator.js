const PDFDocument = require('pdfkit-table');
const cloudinary = require('cloudinary').v2;

const generateInvoicePDF = async (enquiryId, customerData, cartData, shopData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
      
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        // Upload Buffer to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw', // 'raw' is required for PDF delivery
            folder: 'invoices',
            public_id: `invoice-${enquiryId}-${Date.now()}.pdf` // Add .pdf extension
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        uploadStream.end(pdfData);
      });

      const brandColor = '#C70E17';
      const dateStr = new Date().toLocaleString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const siteName = shopData?.general_settings?.site_name || 'AK Crackers';
      const whatsappNum = shopData?.whatsapp_settings?.number || '';
      const customerServiceNum = shopData?.contact_details?.phone || whatsappNum;
      const shopEmail = shopData?.contact_details?.email || '';

      // --- HEADER ---
      let y = 30;
      
      // Load Logo
      const logoUrl = shopData?.general_settings?.logo_url;
      let logoBuffer = null;
      if (logoUrl) {
        try {
          const response = await fetch(logoUrl);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            logoBuffer = Buffer.from(arrayBuffer);
          }
        } catch(e) {
          console.error("Error loading logo:", e);
        }
      }

      if (logoBuffer) {
        // Watermark (Center)
        doc.save()
           .opacity(0.15)
           .image(logoBuffer, (doc.page.width - 250)/2, (doc.page.height - 250)/2, { width: 250 })
           .restore();
           
        // Top left header logo
        doc.image(logoBuffer, 30, y, { height: 40 });
      }

      // Title
      doc.font('Helvetica-Bold')
         .fillColor(brandColor)
         .fontSize(24)
         .text(siteName, logoBuffer ? 100 : 30, y + 5);

      // Meta Info
      doc.fontSize(10).fillColor('#333')
         .text(`Enquiry No: #${enquiryId}`, 300, y + 5, { align: 'right' })
         .text(`Date: ${dateStr}`, 300, y + 20, { align: 'right' });

      y += 60;
      
      // Sub Header (Mobile/Email)
      doc.rect(30, y, 535, 25).fill(brandColor);
      doc.fillColor('white').fontSize(10)
         .text(`Mobile: ${customerServiceNum}`, 40, y + 7)
         .text(`Email: ${shopEmail}`, 300, y + 7, { align: 'right', width: 255 });
      
      y += 40;

      // Bill To
      doc.fillColor(brandColor).fontSize(12).text('Customer Details (Bill To)', 30, y);
      doc.moveTo(30, y + 15).lineTo(250, y + 15).strokeColor('#fca5a5').lineWidth(1).stroke();
      y += 25;
      
      doc.fillColor('#333').fontSize(10)
         .text(customerData.customer_name || 'N/A', 30, y)
         .text(customerData.mobile_number || 'N/A', 30, y + 15)
         .text((customerData.customer_address || '').replace(/\n/g, ' '), 30, y + 30, { width: 250 });

      y += 70;

      // Table Data
      let totalAmount = 0;
      let totalSavings = 0;
      let totalItems = 0;

      const tableDatas = cartData.map((item, index) => {
        const qty = parseInt(item.quantity) || 1;
        const sellingPrice = parseFloat(item.price) || 0;
        const strikePrice = parseFloat(item.originalPrice) || sellingPrice;
        const discount = parseFloat(item.discount) || parseFloat(item.discount_percentage) || 0;
        
        const totalLinePrice = sellingPrice * qty;
        
        totalAmount += totalLinePrice;
        totalSavings += ((strikePrice * qty) - totalLinePrice);
        totalItems += qty;

        return {
          sno: (index + 1).toString(),
          name: item.name,
          qty: qty.toString(),
          mrp: `Rs.${strikePrice}`,
          dis: `${discount}%`,
          rate: `Rs.${sellingPrice}`,
          total: `Rs.${totalLinePrice}`
        };
      });

      const table = {
        headers: [
          { label: "S.NO", property: 'sno', width: 30, renderer: null },
          { label: "PRODUCT NAME", property: 'name', width: 220, renderer: null },
          { label: "QTY", property: 'qty', width: 35, renderer: null },
          { label: "MRP", property: 'mrp', width: 55, renderer: null },
          { label: "DIS %", property: 'dis', width: 40, renderer: null },
          { label: "RATE", property: 'rate', width: 55, renderer: null },
          { label: "TOTAL", property: 'total', width: 65, renderer: null }
        ],
        datas: tableDatas,
      };

      await doc.table(table, {
        x: 30,
        y: y,
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(9),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(9);
          indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? '#FBF3F3' : '#ffffff'), 0.5);
        },
      });

      // Totals
      y = doc.y + 10;
      doc.rect(300, y, 265, 25).fill('#FBF3F3');
      doc.fillColor(brandColor).font('Helvetica-Bold').fontSize(11)
         .text('Sub Total', 310, y + 8)
         .text(`Rs.${totalAmount}`, 400, y + 8, { align: 'right', width: 155 });
      
      y += 30;
      doc.rect(300, y, 265, 25).fill(brandColor);
      doc.fillColor('white').fontSize(12)
         .text('Overall Total', 310, y + 7)
         .text(`Rs.${totalAmount}`, 400, y + 7, { align: 'right', width: 155 });

      y += 40;
      doc.lineWidth(1).strokeColor(brandColor).dash(2, { space: 2 }).rect(30, y, 535, 30).stroke();
      doc.undash();
      
      doc.fillColor('#333').font('Helvetica').fontSize(10)
         .text(`Total Items: `, 40, y + 10)
         .font('Helvetica-Bold').fillColor(brandColor).text(`${totalItems}`, 100, y + 10);

      doc.fillColor('#333').font('Helvetica').text(`You Save: `, 410, y + 10)
         .font('Helvetica-Bold').fillColor('#16a34a').text(`Rs.${totalSavings}`, 470, y + 10);

      y += 50;
      
      // Bottom Address Block
      doc.fillColor(brandColor).font('Helvetica-Bold').fontSize(12)
         .text(`${siteName} (From)`, 300, y, { align: 'right', width: 265 });
         
      y += 15;
      
      doc.fillColor('#555').font('Helvetica').fontSize(9)
         .text(`Phone: ${customerServiceNum}`, 300, y, { align: 'right', width: 265 });
      
      y += 12;
      
      doc.text(`Email: ${shopEmail}`, 300, y, { align: 'right', width: 265 });
      
      y += 12;
      
      const storeAddress = shopData?.contact_details?.address || '';
      if (storeAddress) {
        doc.text(`Address: ${storeAddress.replace(/\n/g, ', ')}`, 300, y, { align: 'right', width: 265 });
      }

      doc.end();

    } catch (err) {
      console.error("PDF generation error:", err);
      reject(err);
    }
  });
};

module.exports = { generateInvoicePDF };
