$(document).ready(onReady);

function onReady() {
  console.log('jQuery Ready 🚦')
  // Listeners 
  $('#submit-btn').on('click', handleInput)
  $('#table').on('click', '.complete-btn', toggleComplete)
  $('#table').on('click', '.delete-btn', deleteTask)
  getTasks()
} // end onReady


// Handlers

let newTask = {}

function handleInput() {
  // Object to send server side
    newTask = {
    description: $('#user-input').val(),
  }
  sendTask()
  $('#user-input').val('')
}

// Run on page load to refresh [ taskList ]
function getTasks() {
  console.log('updating tasks..')
  $.ajax({
    method: 'GET',
    url: '/tasks'
  })
  .then((response) => {
    const taskList = response;
    render(taskList)
    console.log('update complete.')
  })
  .catch((error) => {
    console.log('update error :', error)
  })
} // end getTasks


function sendTask() {
  console.log('req to send :', newTask)
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newTask
  })
  .then((response) => {
    console.log('Response :', response)
    getTasks ()
  })
  .catch((error) => {
    alert('POST Error :', error)
  })
}



// Render DOM
function render(array) {
  console.log('rendering...')
  $('#table').empty()
  
  for (let task of array) {    
    const newRow = $(`
    <tr>
      <td>${task.description}</td>
      <td>${task.status}</td>
      <td>
        <button class="complete-btn"
        data-id="${task.id}"
        data-status="${task.status}">
        Done
        </button>
      </td>
      <td>
        <button 
          class="delete-btn"
          data-id="${task.id}">
          Delete?
        </button>
      </td> 
    </tr>
    `)
    
    newRow.data('id');
    $('#table').append(newRow)
  } // end for
  console.log('render complete')
} // end render

function toggleComplete() {
  const forUpdate = $(this).data('id')
  const status = $(this).data('status')
  console.log('req update id :', forUpdate)

  $.ajax ({
    method: 'PUT',
    url: `/tasks/updatetask/${forUpdate}`,
    data: {newStatus: !status}
  }).then((response) => {
    console.log('task updated :', response)
    getTasks()
  }).catch((error) => {
    console.log('no server connection :', error)
  })
} // end toggleComplete

function deleteTask() {
  let forDelete = $(this).data('id')
  console.log('req deletion id :', forDelete)
  $.ajax ({
    method: 'DELETE',
    url: `/tasks/deletetask/${forDelete}`
  }).then((response) => {
    console.log('task delete res : ', response)
  }).catch((error) => {
    console.log('no server connection :', error)
  })
  getTasks()
} // end deleteTask