const { Pool } = require("pg");
const localPool = new Pool({
  connectionString: "postgres://postgres:1234@localhost:5432/shidduch",
  ssl: false,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});
const remotePool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});
const pool = process.env.REMOTE ? remotePool : localPool;
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
