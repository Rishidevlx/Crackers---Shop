const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool to TiDB
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Test connection and auto-create DB if it doesn't exist
const initDB = async () => {
  try {
    // Connect without database selected first to create it
    const tempPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
    });

    await tempPool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' checked/created successfully.`);
    tempPool.end();

    // Verify main connection and create tables
    const connection = await pool.getConnection();
    
    // Create home_cms table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS home_cms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cms_key VARCHAR(255) UNIQUE NOT NULL,
        cms_value JSON NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Create categories table
    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NULL,
        parent_id INT NULL,
        sort_order INT DEFAULT 0,
        image_url VARCHAR(500) NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `;
    await pool.query(createCategoriesTable);

    // Create products table
    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description JSON NULL,
        category_id INT NULL,
        original_price DECIMAL(10, 2) NULL,
        price DECIMAL(10, 2) NOT NULL,
        unit JSON NULL,
        main_image VARCHAR(500) NULL,
        sub_images JSON NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        is_offer_active BOOLEAN DEFAULT FALSE,
        offer_start_date DATETIME NULL,
        offer_end_date DATETIME NULL,
        moq INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `;
    await pool.query(createProductsTable);

    const createWhatsAppEnquiriesTable = `
      CREATE TABLE IF NOT EXISTS whatsapp_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mobile_number VARCHAR(15) NOT NULL,
        cart_data JSON NULL,
        status ENUM('New', 'Connected', 'Enquiry Success') DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createWhatsAppEnquiriesTable);

    // Create admins table
    const createAdminsTable = `
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'Administrator',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createAdminsTable);

    // Seed initial admin if not exists
    const [adminRows] = await pool.query('SELECT COUNT(*) as count FROM admins');
    if (adminRows[0].count === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await pool.query(
        'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
        ['Super Admin', process.env.ADMIN_EMAIL, hashedPassword]
      );
      console.log('Initial admin user seeded successfully.');
    }

    console.log('Successfully connected to TiDB Cluster and checked tables!');
    connection.release();
  } catch (err) {
    console.error('Error connecting to TiDB:', err.message);
  }
};

initDB();

module.exports = pool;


