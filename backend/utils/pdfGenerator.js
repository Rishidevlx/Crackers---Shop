const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;

/**
 * Generates an HTML invoice, converts it to a PDF using Puppeteer,
 * and uploads it to Cloudinary as a raw document.
 */
const generateInvoicePDF = async (enquiryId, customerData, cartData, shopData) => {
  // Calculate Totals
  let totalAmount = 0;
  let totalSavings = 0;
  let totalItems = 0;

  const itemsHtml = cartData.map((item, index) => {
    const qty = parseInt(item.quantity) || 1;
    const price = parseFloat(item.price) || 0;
    const discount = parseFloat(item.discount_percentage) || 0;
    
    // Using the same logic as Frontend
    const finalPrice = Math.round(price - (price * (discount / 100)));
    const totalLinePrice = finalPrice * qty;
    
    totalAmount += totalLinePrice;
    totalSavings += ((price * qty) - totalLinePrice);
    totalItems += qty;

    return `
      <tr>
        <td style="text-align: center;">${index + 1}</td>
        <td>${item.name}</td>
        <td style="text-align: center;">${qty}</td>
        <td style="text-align: center;"><del style="color: #999;">₹${price}</del></td>
        <td style="text-align: center;">${discount}%</td>
        <td style="text-align: center;">₹${finalPrice}</td>
        <td style="text-align: right; font-weight: bold;">₹${totalLinePrice}</td>
      </tr>
    `;
  }).join('');

  // Current Date
  const dateStr = new Date().toLocaleString('en-IN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const logoUrl = shopData?.general_settings?.logo_url || '';
  const siteName = shopData?.general_settings?.site_name || 'AK Crackers';
  const whatsappNum = shopData?.whatsapp_settings?.number || '';
  const shopAddress = shopData?.contact_details?.address || '';
  const shopEmail = shopData?.contact_details?.email || '';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Invoice #${enquiryId}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 40px;
          color: #333;
          background: white;
          position: relative;
        }
        /* Watermark */
        body::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('${logoUrl}');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 50%;
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }
        .container {
          position: relative;
          z-index: 1;
        }
        .header {
          display: flex;
          justify-content: space-between;
          background-color: #FBF3F3;
          padding: 15px 20px;
          border-bottom: 3px solid #C70E17;
          align-items: center;
        }
        .header-left {
          display: flex;
          align-items: center;
        }
        .header-logo {
          height: 50px;
          margin-right: 15px;
        }
        .header h1 {
          margin: 0;
          color: #C70E17;
          font-size: 24px;
          text-transform: uppercase;
        }
        .sub-header {
          background-color: #C70E17;
          color: white;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        .address-section {
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .bill-to {
          width: 100%;
        }
        h3 {
          color: #C70E17;
          border-bottom: 1px solid #fca5a5;
          padding-bottom: 5px;
          margin-bottom: 10px;
          font-size: 16px;
        }
        p {
          margin: 4px 0;
          font-size: 14px;
          line-height: 1.5;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #e5e7eb;
          padding: 10px;
          font-size: 13px;
        }
        th {
          background-color: #C70E17;
          color: white;
          font-weight: bold;
          text-transform: uppercase;
        }
        tr:nth-child(even) {
          background-color: #FBF3F3;
        }
        .totals-row {
          background-color: #FBF3F3;
          font-weight: bold;
        }
        .totals-row td {
          border-top: 2px solid #C70E17;
        }
        .summary {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          background-color: #FBF3F3;
          border: 1px dashed #C70E17;
          padding: 15px;
          border-radius: 8px;
        }
        .summary-item {
          font-size: 14px;
        }
        .summary-item span {
          font-weight: bold;
          color: #C70E17;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-left">
            ${logoUrl ? `<img src="${logoUrl}" alt="Logo" class="header-logo">` : ''}
            <h1>ESTIMATE</h1>
          </div>
          <div style="text-align: right;">
            <div><strong>Enquiry No:</strong> #${enquiryId}</div>
            <div><strong>Date:</strong> ${dateStr}</div>
          </div>
        </div>
        
        <div class="sub-header">
          <div><strong>Mobile:</strong> ${whatsappNum}</div>
          <div><strong>Email:</strong> ${shopEmail}</div>
        </div>

        <div class="address-section">
          <div class="bill-to">
            <h3>Customer Details (Bill To)</h3>
            <p><strong>${customerData.customer_name}</strong></p>
            <p>${customerData.mobile_number}</p>
            <p>${customerData.customer_address.replace(/\n/g, '<br>')}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 5%">S.NO</th>
              <th style="text-align: left; width: 35%">PRODUCT NAME</th>
              <th style="width: 10%">QTY</th>
              <th style="width: 12%">MRP</th>
              <th style="width: 10%">DIS %</th>
              <th style="width: 12%">RATE</th>
              <th style="text-align: right; width: 16%">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr class="totals-row">
              <td colspan="6" style="text-align: right; color: #C70E17;">Sub Total</td>
              <td style="text-align: right; color: #C70E17;">₹${totalAmount}</td>
            </tr>
            <tr class="totals-row">
              <td colspan="6" style="text-align: right; color: #C70E17;">Packing (0%)</td>
              <td style="text-align: right; color: #C70E17;">₹0</td>
            </tr>
            <tr class="totals-row" style="font-size: 16px;">
              <td colspan="6" style="text-align: right; background-color: #C70E17; color: white;">Overall Total</td>
              <td style="text-align: right; background-color: #C70E17; color: white;">₹${totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-item">Total Items: <span>${totalItems}</span></div>
          <div class="summary-item">You Save: <span style="color: #16a34a;">₹${totalSavings}</span></div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Generate Image using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF using Puppeteer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    
    await browser.close();

    // Convert Uint8Array to Node.js Buffer
    const nodeBuffer = Buffer.from(pdfBuffer);

    // Upload Buffer to Cloudinary
    return new Promise((resolve, reject) => {
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
      // Use standard Node stream end
      uploadStream.end(nodeBuffer);
    });

  } catch (err) {
    console.error('PDF Generation Error:', err);
    throw err;
  }
};

module.exports = { generateInvoicePDF };
