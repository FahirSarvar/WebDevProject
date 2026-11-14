import { useState, useEffect } from "react";
import { listItems, createItem, updateItem, removeItem } from "./api.js";
import { getAuth } from "./auth.js";

export default function Items() {
  const auth = getAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    listItems().then((data) => setItems(Array.isArray(data) ? data : []));

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editId
      ? updateItem(auth.token, editId, form)
      : createItem(auth.token, form);
    action.then((data) => {
      if (data.error) setError(data.error);
      else {
        setForm({ title: "", description: "" });
        setEditId(null);
        setError("");
        load();
      }
    });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ title: item.title, description: item.description || "" });
  };

  const handleDelete = (id) => {
    removeItem(auth.token, id).then((data) => {
      if (data.error) setError(data.error);
      else load();
    });
  };

  return (
    <div>
      <h2>Items</h2>

      {auth && (
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />{" "}
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />{" "}
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <b>{item.title}</b> - {item.description}{" "}
            {auth && auth.user._id === item.owner && (
              <>
                <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}