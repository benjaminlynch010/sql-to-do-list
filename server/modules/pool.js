// Setup Pool
const pg = require ('pg')
let pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'weekend-to-do-app'
})

module.exports = pool