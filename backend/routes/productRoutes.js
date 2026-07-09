const express = require('express');
const router = express.Router();
const db = require('../config/db');
const protect = require('../middleware/authMiddleware');

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  const {
    name,
    description,
    category_id,
    original_price,
    price,
    unit,
    main_image,
    sub_images,
    status
  } = req.body;

  try {
    const query = `
      INSERT INTO products (
        name, description, category_id, original_price, price, unit, main_image, sub_images, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      description ? JSON.stringify(description) : null,
      category_id || null,
      original_price || null,
      price,
      unit ? JSON.stringify(unit) : null,
      main_image || null,
      sub_images ? JSON.stringify(sub_images) : null,
      status || 'active'
    ];

    const [result] = await db.query(query, values);

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        name,
        category_id,
        price
      },
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    require('fs').writeFileSync('debug_error.log', error.stack || error.toString());
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// @route   PUT /api/products/bulk-update-offers
// @desc    Bulk update product offers
// @access  Private (Admin)
router.put('/bulk-update-offers', protect, async (req, res) => {
  try {
    const { offers } = req.body;
    if (!Array.isArray(offers)) {
      return res.status(400).json({ success: false, message: 'Invalid data format' });
    }

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      for (const offer of offers) {
        const { id, price, is_offer_active, offer_start_date, offer_end_date } = offer;
        
        await connection.query(`
          UPDATE products 
          SET 
            price = ?, 
            is_offer_active = ?, 
            offer_start_date = ?, 
            offer_end_date = ?
          WHERE id = ?
        `, [
          price, 
          is_offer_active ? 1 : 0, 
          offer_start_date || null, 
          offer_end_date || null, 
          id
        ]);
      }
      
      await connection.commit();
      connection.release();
      res.json({ success: true, message: 'Offers updated successfully' });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error bulk updating offers:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update an existing product
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    category_id,
    original_price,
    price,
    unit,
    main_image,
    sub_images,
    status
  } = req.body;

  try {
    const query = `
      UPDATE products SET 
        name = ?, description = ?, category_id = ?, original_price = ?, price = ?, 
        unit = ?, main_image = ?, sub_images = ?, status = ?
      WHERE id = ?
    `;

    const values = [
      name,
      description ? JSON.stringify(description) : null,
      category_id || null,
      original_price || null,
      price,
      unit ? JSON.stringify(unit) : null,
      main_image || null,
      sub_images ? JSON.stringify(sub_images) : null,
      status || 'active',
      id
    ];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});



// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/products/bulk-status
// @desc    Update status of multiple products
// @access  Private (Admin)
router.put('/bulk-status', protect, async (req, res) => {
  const { ids, status } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid product IDs' });
  }

  if (!['active', 'inactive'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  try {
    const placeholders = ids.map(() => '?').join(',');
    const query = `UPDATE products SET status = ? WHERE id IN (${placeholders})`;
    const values = [status, ...ids];
    
    await db.query(query, values);
    res.json({ success: true, message: `Products marked as ${status}` });
  } catch (error) {
    console.error('Error updating product statuses:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   DELETE /api/products/bulk
// @desc    Delete multiple products
// @access  Private (Admin)
router.delete('/bulk', protect, async (req, res) => {
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid product IDs' });
  }

  try {
    const placeholders = ids.map(() => '?').join(',');
    const query = `DELETE FROM products WHERE id IN (${placeholders})`;
    
    await db.query(query, ids);
    res.json({ success: true, message: 'Products deleted successfully' });
  } catch (error) {
    console.error('Error deleting products:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product by ID
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
