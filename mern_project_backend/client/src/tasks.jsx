import { useState, useEffect } from "react";
import { listTasks, createTask, updateTask, removeTask } from "./api.js";
import { getAuth } from "./auth.js";

const emptyForm = { title: "", description: "", dueDate: "", priority: "Medium", status: "pending" };

export default function Tasks() {
  const auth = getAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    if (!auth) return;
    listTasks(auth.token).then((data) => setTasks(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editId
      ? updateTask(auth.token, editId, form)
      : createTask(auth.token, form);
    action.then((data) => {
      if (data.error) setError(data.error);
      else {
        setForm(emptyForm);
        setEditId(null);
        setError("");
        load();
      }
    });
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setForm({
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : "",
      priority: task.priority,
      status: task.status,
    });
  };

  const handleToggle = (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    updateTask(auth.token, task._id, { status: newStatus }).then((data) => {
      if (data.error) setError(data.error);
      else load();
    });
  };

  const handleDelete = (id) => {
    removeTask(auth.token, id).then((data) => {
      if (data.error) setError(data.error);
      else load();
    });
  };

  if (!auth) return <p>Please sign in to see your tasks.</p>;

  const pending = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div>
      <h2>My tasks</h2>
      <p>
        Total: {tasks.length} | Pending: {pending} | Completed: {completed}
      </p>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} /><br />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />
        <label>Due date: </label>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} /><br />
        <label>Priority: </label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>{" "}
        <label>Status: </label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select><br />
        <button type="submit">{editId ? "Update task" : "Add task"}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <b>{task.title}</b> - {task.description} | Due:{" "}
            {task.dueDate ? new Date(task.dueDate).toDateString() : "none"} | Priority: {task.priority} | Status:{" "}
            {task.status}{" "}
            <button onClick={() => handleToggle(task)}>
              {task.status === "completed" ? "Mark pending" : "Mark completed"}
            </button>{" "}
            <button onClick={() => handleEdit(task)}>Edit</button>{" "}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
