const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load env variables
dotenv.config();

// Connect to TiDB
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const uploadRoutes = require('./routes/uploadRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/upload', uploadRoutes);
app.use('/api/cms/home', cmsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('AK Crackers Admin API is running!');
});

// Admin Login Endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  // Check against .env values
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Generate JWT token
    const token = jwt.sign(
      { id: 'admin1', email, role: 'admin' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      token,
      user: { email }
    });
  }

  return res.status(401).json({ 
    success: false, 
    message: 'Invalid email or password' 
  });
});

// New Routes
app.use('/api/cms/home', require('./routes/cmsRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
