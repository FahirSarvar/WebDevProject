const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const authHeaders = (token) => ({ ...jsonHeaders, Authorization: `Bearer ${token}` });

export const signup = (user) =>
  fetch("/api/users", { method: "POST", headers: jsonHeaders, body: JSON.stringify(user) })
    .then((r) => r.json());

export const signin = (user) =>
  fetch("/auth/signin", { method: "POST", headers: jsonHeaders, body: JSON.stringify(user) })
    .then((r) => r.json());

export const signout = () => fetch("/auth/signout").then((r) => r.json());

export const listTasks = (token) =>
  fetch("/api/tasks", { headers: authHeaders(token) }).then((r) => r.json());

export const createTask = (token, task) =>
  fetch("/api/tasks", { method: "POST", headers: authHeaders(token), body: JSON.stringify(task) })
    .then((r) => r.json());

export const updateTask = (token, id, task) =>
  fetch(`/api/tasks/${id}`, { method: "PUT", headers: authHeaders(token), body: JSON.stringify(task) })
    .then((r) => r.json());

export const removeTask = (token, id) =>
  fetch(`/api/tasks/${id}`, { method: "DELETE", headers: authHeaders(token) })
    .then((r) => r.json());
