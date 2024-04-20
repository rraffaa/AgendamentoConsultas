const pg = require('pg');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '24681012',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'consultas-db',
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
