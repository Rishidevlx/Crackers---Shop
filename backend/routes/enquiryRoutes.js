const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const protect = require('../middleware/authMiddleware');

// @desc    Create a new WhatsApp enquiry
// @route   POST /api/enquiries/whatsapp
// @access  Public
router.post('/whatsapp', async (req, res) => {
  const { mobile_number, cart_data } = req.body;

  if (!mobile_number) {
    return res.status(400).json({ success: false, message: 'Mobile number is required' });
  }

  try {
    const connection = await pool.getConnection();
    const query = `
      INSERT INTO whatsapp_enquiries (mobile_number, cart_data) 
      VALUES (?, ?)
    `;
    await connection.query(query, [mobile_number, JSON.stringify(cart_data || {})]);
    
    connection.release();
    res.status(201).json({ success: true, message: 'Enquiry saved successfully' });
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
router.post('/bulk-delete', protect, async (req, res) => {
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
router.post('/bulk-status', protect, async (req, res) => {
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
