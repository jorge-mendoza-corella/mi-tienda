const { Client } = require('pg');

async function getConexion() {

  const client = new Client({
    host: 'localhost',
    port: '5432',
  user: 'jorge',
  password: 'admin123',
  database: 'mi_tiendita'
  });
  await client.connect();
  return client;
}


module.exports = getConexion;

