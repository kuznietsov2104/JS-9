// Завдання з телеграму

const form = document.querySelector('.todo-form');
const input = form.querySelector('.todo-input');
const list = document.querySelector('.todo-list');
const counter = document.querySelector('.todo-counter');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;
  li.setAttribute('data-done', 'false');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '✕';
  li.appendChild(deleteButton);

  list.appendChild(li);
  input.value = '';
  input.focus();
  updateCounter();
});

list.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) {
    const li = button.closest('li');
    li.remove();
    updateCounter();
    return;
  }

  const li = event.target.closest('li');
  if (li) {
    const isDone = li.getAttribute('data-done') === 'true';
    li.setAttribute('data-done', isDone ? 'false' : 'true');
    updateCounter();
  }
});

function updateCounter() {
  const totalTasks = list.querySelectorAll('li').length;
  const doneTasks = list.querySelectorAll('li[data-done="true"]').length;
  counter.textContent = `Виконано: ${doneTasks} / ${totalTasks}`;
};