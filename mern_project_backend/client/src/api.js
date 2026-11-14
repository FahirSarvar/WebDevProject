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

export const listItems = () => fetch("/api/items").then((r) => r.json());

export const createItem = (token, item) =>
  fetch("/api/items", { method: "POST", headers: authHeaders(token), body: JSON.stringify(item) })
    .then((r) => r.json());

export const updateItem = (token, id, item) =>
  fetch(`/api/items/${id}`, { method: "PUT", headers: authHeaders(token), body: JSON.stringify(item) })
    .then((r) => r.json());

export const removeItem = (token, id) =>
  fetch(`/api/items/${id}`, { method: "DELETE", headers: authHeaders(token) })
    .then((r) => r.json());

export const signout = () => fetch("/auth/signout").then((r) => r.json());