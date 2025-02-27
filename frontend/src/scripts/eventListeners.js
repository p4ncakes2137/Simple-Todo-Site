import { getToken } from './config.js';
import { login, register, logout } from './auth.js';
import { addTask, deleteTask, toggleTask } from './tasks.js';
import { showAuthSection, showTodoSection, setAuthMessage, refreshTaskList, toggleDarkMode } from './userInterface.js';

function handleTaskListClick(event) {
  const target = event.target;
  if (!target.matches('button')) return;
  
  const li = target.closest('li');
  if (!li) return;
  
  const taskId = li.dataset.taskId;
  const completed = li.dataset.completed === 'true';

  if (target.classList.contains('complete-btn')) {
    toggleTask(taskId, !completed).then(refreshTaskList);
  } else if (target.classList.contains('remove-btn')) {
    deleteTask(taskId).then(refreshTaskList);
  }
}

export function setupEventListeners() {
  // Auth Event Listeners
  document.getElementById('registerButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const result = await register(username, password);
    setAuthMessage(result?.message || 'Registration successful!');
  });

  document.getElementById('loginButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const result = await login(username, password);
    if (getToken()) {
      showTodoSection();
      refreshTaskList();
    } else {
      setAuthMessage(result?.message || 'Login failed');
    }
  });

  document.getElementById('logoutButton').addEventListener('click', () => {
    logout();
    showAuthSection();
  });

  // Task Event Listeners
  document.getElementById('addTaskBtn').addEventListener('click', async () => {
    const content = document.getElementById('taskInput').value;
    if (content) {
      await addTask(content);
      document.getElementById('taskInput').value = '';
      await refreshTaskList();
    }
  });

  document.getElementById('taskList').addEventListener('click', handleTaskListClick);

  // Utility Event Listeners
  document.getElementById('showPasswordBtn').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const showPasswordBtn = document.getElementById('showPasswordBtn');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordBtn.textContent = 'Hide Password';
    } else {
      passwordInput.type = 'password';
      showPasswordBtn.textContent = 'Show Password';
    }
  });

  document.getElementById('theme-toggle-btn').addEventListener('click', toggleDarkMode);
}