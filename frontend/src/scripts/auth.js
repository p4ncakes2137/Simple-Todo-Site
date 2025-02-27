import { API_URL, setToken } from './config.js';

export async function register(username, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    return await res.json();
  } catch (err) {
    console.error('Registration failed', err);
    throw err;
  }
}

export async function login(username, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    const data = await res.json();
    if (data.token) setToken(data.token);
    return data;
  } catch (err) {
    console.error('Login failed', err);
    throw err;
  }
}

export function logout() {
  setToken(null);
}