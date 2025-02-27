import { fetchTasks } from './tasks.js';

export function showTodoSection() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('todo-section').style.display = 'block';
}

export function showAuthSection() {
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('todo-section').style.display = 'none';
}

export function renderTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.taskId = task.id;
    li.dataset.completed = task.completed;

    const taskText = document.createElement('span');
    taskText.textContent = task.content;
    if (task.completed) {
      taskText.style.textDecoration = 'line-through';
      taskText.style.color = '#888';
    }

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-btn';
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';

    li.appendChild(taskText);
    li.appendChild(completeButton);

    if (task.completed) {
      const removeButton = document.createElement('button');
      removeButton.className = 'remove-btn';
      removeButton.textContent = 'Remove';
      li.appendChild(removeButton);
    }

    taskList.appendChild(li);
  });
}

export async function refreshTaskList() {
  try {
    renderTasks(await fetchTasks());
  } catch (error) {
    console.error('Error refreshing tasks', error);
  }
}

export function setAuthMessage(message) {
  document.getElementById('auth-message').textContent = message;
}

export function initializeDarkMode() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}

export function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}