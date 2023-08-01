// Setup Pool
const pg = require ('pg')
let pool;
console.log('DB URL : ', process.env.DATABASE_URL)
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false
    }
  })
}
else {
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'todoapp_qawb'
  })
}


module.exports = pool