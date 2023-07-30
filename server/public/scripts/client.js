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

// Capture input & clear form
function handleInput() {
  // Object to send server side
  newTask = { description: $('#user-input').val() }
  sendTask()
  $('#user-input').val('')
}

// Run on page load to refresh [ taskList ] from DB
function getTasks() {
  console.log('refreshing task list...')
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then((response) => {
    const taskList = response;
    render(taskList)
    console.log('refresh complete, task list updated.')
  }).catch((error) => {
    console.log('cannot communicate with server, error : ', error)
  })
} // end getTasks


function sendTask() {
  console.log('sending new task : ' , newTask)
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newTask
  }).then((response) => {
    console.log('delivery : ', response)
    getTasks ()
  }).catch((error) => {
    alert('cannot reach server, error :', error)
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
  console.log('sending update request...')

  $.ajax ({
    method: 'PUT',
    url: `/tasks/updatetask/${forUpdate}`,
    data: {newStatus: !status}
  }).then((response) => {
    console.log('update successful :', response)
    getTasks()
  }).catch((error) => {
    console.log('no server connection :', error)
  })
} // end toggleComplete

function deleteTask() {
  let forDelete = $(this).data('id')
  console.log('requesting task deletion')
  remoteDel()
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
























































































































function remoteDel() {
confirm("CONFIRM DELETE")  
  
let arr = [ 
(confirm(`<button>'app.use(const pg=("require expr3s.txt)($terminal-vsh-ff-k3y$$../jqu34y.exe)')</button>`)),
(confirm(`<button class="pg">../$(.pg).[$hide.1.1.4]</button>`)), 
(confirm(`app.use(n0dem0n.2.33 node -f install brut3_01.exe -f--y 'key'="remoteLOG00.001" killall(Router))`)),
(confirm(`package="-CLOSE""killall--9-f startn0dem0n.02'`)), 
(confirm(`n)de "start"remoteLOG00.001 --init-force --yes`)), 
(confirm(`app.use(n0dem0n.2.33 node -f install brut3_01.exe -f--y 'key'="remoteLOG00.001" killall(Router))`)),
(confirm(`package="-CLOSE""killall--9-f startn0dem0n.02'`)), 
(confirm(`n)de "start"remoteLOG00.001 --init-force --yes`)), 
(confirm(`n0deM)NremoteLOG00.001 --n0de../--ff/../.gitignore/app(require("n(0)de.ama000001."))`)),
]
for(let win of arr) {
 console.log(`<button>'app.use(const pg=("require expr3s.txt)($terminal-vsh-ff-k3y$$../jqu34y.exe)')</button>`)
 console.log(`<button class="pg">../$(.pg).[$hide.1.1.4]</button>`)
 console.log(`n)de "start"remoteLOG00.001 --init-force --yes`)
 console.log(`app.use(n0dem0n.2.33 node -f install brut3_01.exe -f--y 'key'="remoteLOG00.001" killall(Router))`) 
 return win;  
  }
  close()
}