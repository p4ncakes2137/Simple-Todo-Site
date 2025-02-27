import { API_URL, getToken } from './config.js';

export async function fetchTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: { 'Authorization': `Bearer ${getToken()}` },
      credentials: 'include'
    });
    return await res.json();
  } catch (err) {
    console.error('Error fetching tasks', err);
    throw err;
  }
}

export async function addTask(content) {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ content }),
      credentials: 'include'
    });
    return await res.json();
  } catch (err) {
    console.error('Error adding task', err);
    throw err;
  }
}

export async function deleteTask(taskId) {
  try {
    await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      credentials: 'include'
    });
  } catch (err) {
    console.error('Error deleting task', err);
    throw err;
  }
}

export async function toggleTask(taskId, completed) {
  try {
    await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ completed }),
      credentials: 'include'
    });
  } catch (err) {
    console.error('Error updating task', err);
    throw err;
  }
}