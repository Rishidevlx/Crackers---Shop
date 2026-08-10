const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const protect = require('../middleware/authMiddleware');
const { generateInvoicePDF } = require('../utils/pdfGenerator');

// @desc    Create a new WhatsApp enquiry
// @route   POST /api/enquiries/whatsapp
// @access  Public
router.post('/whatsapp', async (req, res) => {
  const { mobile_number, cart_data, customer_name, customer_address } = req.body;

  if (!mobile_number || !customer_name || !customer_address) {
    return res.status(400).json({ success: false, message: 'Required fields are missing' });
  }

  try {
    const connection = await pool.getConnection();

    const [maxRes] = await connection.query('SELECT MAX(enquiry_no) as max_no FROM whatsapp_enquiries');
    let nextEnquiryNo = (maxRes[0].max_no || 0) + 1;

    const query = `
      INSERT INTO whatsapp_enquiries (enquiry_no, mobile_number, cart_data, customer_name, customer_address) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(query, [nextEnquiryNo, mobile_number, JSON.stringify(cart_data || {}), customer_name, customer_address]);
    const enquiryId = result.insertId;

    // Fetch Shop CMS Data for PDF
    const [cmsRows] = await connection.query('SELECT cms_key, cms_value FROM home_cms');
    let shopData = {};
    cmsRows.forEach(row => {
      try {
        shopData[row.cms_key] = JSON.parse(row.cms_value);
      } catch(e) {
        shopData[row.cms_key] = row.cms_value;
      }
    });

    let invoice_url = null;
    try {
      invoice_url = await generateInvoicePDF(
        nextEnquiryNo, 
        { customer_name, mobile_number, customer_address }, 
        cart_data || [], 
        shopData
      );
      
      // Update DB with invoice URL
      if (invoice_url) {
        await connection.query('UPDATE whatsapp_enquiries SET invoice_url = ? WHERE id = ?', [invoice_url, enquiryId]);
      }
    } catch (pdfErr) {
      console.error('Failed to generate PDF:', pdfErr);
      // We don't fail the enquiry if PDF generation fails, just proceed without it
    }
    
    connection.release();
    res.status(201).json({ success: true, message: 'Enquiry saved successfully', invoice_url });
  } catch (error) {
    console.error('Error saving whatsapp enquiry:', error);
    res.status(500).json({ success: false, message: 'Server error while saving enquiry' });
  }
});

// @desc    Get all WhatsApp enquiries
// @route   GET /api/enquiries/whatsapp
// @access  Private (Admin)
router.get('/whatsapp', protect, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM whatsapp_enquiries ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching whatsapp enquiries:', error);
    res.status(500).json({ success: false, message: 'Server error fetching enquiries' });
  }
});

// @desc    Update WhatsApp enquiry status
// @route   PUT /api/enquiries/whatsapp/:id/status
// @access  Private (Admin)
router.put('/whatsapp/:id/status', protect, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['New', 'Connected', 'Enquiry Success'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const [result] = await pool.query('UPDATE whatsapp_enquiries SET status = ? WHERE id = ?', [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating whatsapp enquiry status:', error);
    res.status(500).json({ success: false, message: 'Server error updating status' });
  }
});

// @desc    Delete WhatsApp enquiry
// @route   DELETE /api/enquiries/whatsapp/:id
// @access  Private (Admin)
router.delete('/whatsapp/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM whatsapp_enquiries WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting whatsapp enquiry:', error);
    res.status(500).json({ success: false, message: 'Server error deleting enquiry' });
  }
});

// @desc    Bulk Delete WhatsApp enquiries
// @route   POST /api/enquiries/whatsapp/bulk-delete
// @access  Private (Admin)
router.post('/whatsapp/bulk-delete', protect, async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid or empty IDs array' });
  }

  try {
    const placeholders = ids.map(() => '?').join(',');
    const [result] = await pool.query(`DELETE FROM whatsapp_enquiries WHERE id IN (${placeholders})`, ids);
    res.json({ success: true, message: `${result.affectedRows} enquiries deleted successfully` });
  } catch (error) {
    console.error('Error bulk deleting whatsapp enquiries:', error);
    res.status(500).json({ success: false, message: 'Server error bulk deleting enquiries' });
  }
});

// @desc    Bulk Update WhatsApp enquiry status
// @route   POST /api/enquiries/whatsapp/bulk-status
// @access  Private (Admin)
router.post('/whatsapp/bulk-status', protect, async (req, res) => {
  const { ids, status } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid or empty IDs array' });
  }
  if (!['New', 'Connected', 'Enquiry Success'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const placeholders = ids.map(() => '?').join(',');
    const [result] = await pool.query(`UPDATE whatsapp_enquiries SET status = ? WHERE id IN (${placeholders})`, [status, ...ids]);
    res.json({ success: true, message: `${result.affectedRows} enquiries updated successfully` });
  } catch (error) {
    console.error('Error bulk updating whatsapp enquiry status:', error);
    res.status(500).json({ success: false, message: 'Server error bulk updating status' });
  }
});

module.exports = router;
