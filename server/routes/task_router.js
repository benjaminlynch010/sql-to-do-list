const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

// const taskList = [];

// GET route
router.get('/', (req, res) => {
  res.sendStatus(200);
  console.log('GET Router : ✅')
});

// POST route
router.post('/', (req, res) => {
  res.sendStatus(200)
  console.log('POST Router : ✅')
});

// PUT route
router.put('/updatetask/:id', (req, res) => {
  console.log('Connected to tasks/updatetask')
  
  let queryText = `
  UPDATE "TASKS"
  SET "STATUS" = $1
  WHERE "ID" = $2;
  `
  let queryParams = (false, req.params.id)


  pool.query(queryText, [queryParams])
    .then((response) => {
      console.log('Task Completed : ✅')
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log('Error in PUT pool query, Error :', error)
      res.sendStatus(500)
    })
})

// DELETE ROUTE
router.delete('/deletetask/:id', (req, res) => {
  console.log('Connected to tasks/deletetask')
  const queryText = `
  DELETE FROM "TASKS"
  WHERE "ID" = $1;
  `
  const queryParams = req.params.id

  pool.query(queryText, [queryParams])
    .then((response) => {
      console.log('Task deleted : 😵')
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log('Error making query :', queryText)
      console.log('Error Message:', error)
      res.sendStatus(500)
    })
})
module.exports = router;