$(document).ready(onReady);

function onReady() {
  console.log('jQuery Ready 🚦')
  // Listeners 
  $('#submit-btn').on('click', handleInput)
  // What do I want to see when the browser is loaded?
  // getList();
} // end onReady

// Global Variables
let newTask = {};
let taskList = []

// Handlers
  // Try to create functions to handle 1 task 


function handleInput() {
  // Object to send server side
  newTask = {
    description: $('#userInput').val(),
    status: true
    // how to handle status?
  }
  console.log(newTask.description)
  getTasks()
}

function sendTask() {
  console.log('In getTasks')
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newTask
  })
  .then(respone => {
    getTasks()
  })
}

function getTasks() {
  $.ajax({
    method: 'GET',
    url: '/tasks'
  })
  .then(response => {
    let taskList = response;
    console.log('Response should be Task Array :',taskList);
    render(taskList)
  })
}

// Render DOM
function render(currentList) {
  console.log('In render 👨‍🎨')
  $('#table').empty()
  
  for (let task of currentList) {
  
    let newRow = $(`
    <tr>
      <td>${task.description}</td>
      <td>${task.status}</td>
      <td>
        <button class="complete-btn">Done?</button>
      </td>
      <td>
        <button class="delete-btn">Delete?</button>
      </td> 
    </tr>
    `)
  
    newRow.data('id', task.id);
    console.log('New Task :', task)
    $('#table').append(newRow)
  } // end for
} // end render
