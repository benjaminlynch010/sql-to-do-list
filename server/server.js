const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
// Serve back static files by default
app.use(express.static("server/public"));

// Bring in router for /tasks
const router = require('./routes/router.js')
app.use('/tasks', router);

// Start listening for requests on localhost:5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log("🙉 on Port:", PORT);
});
