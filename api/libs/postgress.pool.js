const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'jorge',
  password: 'admin123',
  database: 'mi_tiendita'
});

module.exports = pool;

