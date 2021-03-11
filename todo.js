var root = document.getElementById('root')

var todoList = document.createElement('ol')

var form = document.createElement('form')
form.addEventListener('submit', function (event) {
  event.preventDefault()
  var task = document.querySelector('#task')
  var value = task.value
  if (!value) return alert('Task is required!!!')
  addTodo(value)
  saveTodo(value)
  task.value = ''
})

var input = document.createElement('input')
setAttribute(input, {
  placeholder: 'Task',
  type: 'text',
  id: 'task'
})

var submit = document.createElement('input')
setAttribute(submit, {
  type: 'submit',
  value: 'Add'
})

form.append(input)
form.append(submit)

root.append(todoList)
root.append(form)

function addTodo (value) {
  var todo = document.createElement('li')
  todo.append(value)

  var deleteIcon = document.createElement('span')
  deleteIcon.append('x')
  deleteIcon.style.color = 'red'
  deleteIcon.style.margin = '10px'
  deleteIcon.style.cursor = 'pointer'
  deleteIcon.addEventListener('click', function (e) {
    e.target.parentElement.remove()
    removeTodo(value)
  })

  todo.append(deleteIcon)

  todoList.append(todo)
}

function getTodos () {
  var todosString = localStorage.getItem('todos')

  return todosString ? JSON.parse(todosString) : []
}

function saveTodo (value) {
  var todos = getTodos()
  todos.push(value)
  saveTodos(todos)
}

function removeTodo (value) {
  var todos = getTodos()
  var newTodos = todos.filter(function (todo) {
    return todo !== value
  })

  saveTodos(newTodos)
}

function saveTodos (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function setAttribute (element, attributes) {
  for (var attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName])
  }
}

;(function () {
  var todos = getTodos()
  todos.forEach(function (todo) {
    addTodo(todo)
  })
})()

// loadTodos()
