const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


// GET route
router.get('/', (req, res) => {
  console.log('/tasks GET')
  let query = `
  SELECT * FROM "tasks" ORDER BY "id" DESC;
  `
  pool.query(query)
    .then((result) => {
      console.log('/tasks recieved req, sending..')
      res.send(result.rows)
    })
    .catch((error) => {
      console.log('error /tasks GET', error);
      res.sendStatus(500);
    })
});

// POST route
router.post('/', (req, res) => {
  console.log('new task recieved :', req.body)
  let newTask = req.body
  let query = `
  INSERT INTO "tasks" ("description")
  VALUES ($1);
  `
  pool.query(query, [newTask.description]).then((result) => {
    res.sendStatus(200)
    console.log('storing in db...', result);
  }).catch(error => {
    console.log('cannot store task error :', error)
    res.sendStatus(500)
  })
});

// PUT route
router.put('/updatetask/:id', (req, res) => {
  console.log('updating task...')
  const query = `UPDATE "tasks" SET "status" = $1 WHERE "id" = $2;`
  const params = [req.body.newStatus, req.params.id]

  pool.query(query, params).then((response) => {
    console.log('task updated and stored')
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error making query :', error)
    res.sendStatus(500)
  })
})


// DELETE ROUTE
router.delete('/deletetask/:id', (req, res) => {
  console.log('/deletetask DELETE hit :', req.params.id)
  let query = `
  DELETE FROM "tasks"
  WHERE "id" = $1;
  `
  let params = req.params.id

  pool.query(query, [params])
    .then((response) => {
      console.log('task deleted')
      
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log('Error making query :', query)
      console.log('Error Message:', error)
      res.sendStatus(500)
    })
}) // end DELETE

module.exports = router;