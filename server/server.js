const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
// Serve back static files by default
app.use(express.static("server/public"));

// Pull Router
let taskRouter = require('./routes/task_router.js')

app.use('/tasks', taskRouter);

// Routes

// GET

// POST

// PUT

// DELETE



// Start listening for requests on localhost:5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log("🙉 on Port:", PORT);
});
