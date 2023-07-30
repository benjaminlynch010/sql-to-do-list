$(document).ready(onReady);

function onReady() {
  console.log('$jQ : listen')
  // Listeners 
  $('#submit-btn').on('click', handleInput)
  $('#table').on('click', '.complete-btn', toggleComplete)
  $('#table').on('click', '.delete-btn', deleteTask)
  getTasks()
} // end onReady


// h a n d l e r s
let newTask = {}
function handleInput() {
  // capture input
  newTask = { description: $('#user-input').val() }
  // call sendTask to get it server side
  sendTask()
  // empty the form
  $('#user-input').val('')
}

// get updated taskList from server
function getTasks() {
  console.log('refreshing task list...')
  // ajax get whats at /tasks
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then((response) => {
    // expect an array as response
    const taskList = response;
    // call render to update the browser
    render(taskList)
    console.log('refresh complete, task list updated.')
  }).catch((error) => {
    console.log('cannot communicate with server, error : ', error)
  })
} // end getTasks

// send captured user input package
  // server will add to db
function sendTask() {
  console.log('sending new task : ' , newTask)
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newTask
  }).then((response) => {
    console.log('delivery : ', response)
    // get updated [] from db with new obj
    getTasks ()
  }).catch((error) => {
    alert('cannot reach server, error :', error)
  })
}

// Render DOM
function render(array) {
  console.log('rendering...')
  // clear the whole table body 
  $('#table').empty()
  // append all obj in arr to table
  for (let task of array) {    
    // *** edit newRow carefully ***
    const newRow = $(`
    <tr>
      <td>${task.description}</td>
      <td>${task.status}</td>
      <td> <button class="complete-btn" data-id="${task.id}" data-status="${task.status}">Complete?</button></td>
      <td><button class="delete-btn" data-id="${task.id}">Delete?</button></td> 
    </tr>
    `)
    // im not 100% on how this works?? se
      // .data('id') is a setter
      // assign id from db to newRow, append to table 
    newRow.data('id');
    $('#table').append(newRow)
  } // end for
  console.log('render complete')
} // end render

// toggle for complete btn
  // mark task complete
function toggleComplete() {
  // $this : complete-btn, get row 'id'
  const forUpdate = $(this).data('id')
  // and the status : should be t/f bool
  const status = $(this).data('status')
  console.log('sending update request...')
  // ajax put req
  $.ajax ({
    method: 'PUT',
    // server update path to target id clicked
    url: `/tasks/updatetask/${forUpdate}`,
    data: {newStatus: !status}
  }).then((response) => {
    console.log('update successful :', response)
    // refresh to reflect changes client side
    getTasks()
  }).catch((error) => {
    console.log('no server connection :', error)
  })
} // end toggleComplete

function deleteTask() {
  // newRow 'id' where del-btn clicked
  let forDelete = $(this).data('id')
  console.log('requesting task deletion')
  // send del req to server
  $.ajax ({
    method: 'DELETE',
    // server update path to target id clicked
    url: `/tasks/deletetask/${forDelete}`
  }).then((response) => {
    console.log('task delete res : ', response)
    // refresh  
    getTasks()
  }).catch((error) => {
    console.log('no server connection :', error)
  })
} // end deleteTask