const express = require('express');
const router = express.Router();

// const taskList = [];

router.get('/', (req, res) => {
  res.sendStatus(200);
  console.log('GET Router : ✅')
});

router.post('/', (req, res) => {
  res.sendStatus(200)
  console.log('POST Router : ✅')
});

module.exports = router;