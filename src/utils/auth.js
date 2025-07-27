export function login(username, password) {
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('loggedIn', 'true');
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return localStorage.getItem('loggedIn') === 'true';
}