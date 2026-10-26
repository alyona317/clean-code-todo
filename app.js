const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  // innerText, not innerHTML: user input must not be parsed as HTML
  label.innerText = taskString;
  label.className = 'task';
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) {
    return;
  }
  const listItem = createNewTaskElement(newTaskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditing = listItem.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;

  taskList.removeChild(listItem);
};

const moveTask = function (listItem, targetList, nextHandler) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, nextHandler);
};

const markTaskCompleted = function () {
  moveTask(this.parentNode, completedList, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, todoList, markTaskCompleted);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, onCheckboxChange) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = onCheckboxChange;
};

// Tasks from index.html are not created by addTask, so bind their events on page load
const bindListEvents = function (taskList, onCheckboxChange) {
  for (const taskListItem of taskList.children) {
    bindTaskEvents(taskListItem, onCheckboxChange);
  }
};

bindListEvents(todoList, markTaskCompleted);
bindListEvents(completedList, taskIncomplete);
