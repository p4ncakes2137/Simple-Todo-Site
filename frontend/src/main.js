import { getToken } from './scripts/config.js';
import { initializeDarkMode, showAuthSection, showTodoSection, refreshTaskList } from './scripts/userInterface.js';
import { setupEventListeners } from './scripts/eventListeners.js';

function initializeApp() {
  initializeDarkMode();
  setupEventListeners();
  
  getToken() ? (showTodoSection(), refreshTaskList()) : showAuthSection();
}

document.addEventListener('DOMContentLoaded', initializeApp);