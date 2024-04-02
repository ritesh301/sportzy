// server.js

const express = require('express');
const app = express();
const port = 3000; // Change this to your desired port number
const { Pool } = require('pg');


// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pla',
  password: 'ritesh301',
  port: 5432, // Change if necessary
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM plain');
    users.rows.forEach(user => {
      // Convert bytea data to Base64
      user.photo_data = Buffer.from(user.data, 'binary').toString('base64');
      // Construct data URL for image
      user.photo_url = `data:${user.mimetype};base64,${user.photo_data}`;
    });
    res.render('index', { users: users.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
