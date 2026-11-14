import Task from "../models/task.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
  try {
    const task = new Task(req.body);
    task.owner = req.auth._id; // owner comes from the signed-in user's token
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// each user only sees their own tasks
const list = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.auth._id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const taskByID = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(400).json({ error: "Task not found" });
    req.task = task;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve task" });
  }
};

const read = (req, res) => {
  return res.json(req.task);
};

const update = async (req, res) => {
  try {
    let task = extend(req.task, req.body);
    task.updated = Date.now();
    await task.save();
    res.json(task);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    const deletedTask = await req.task.deleteOne();
    res.json(deletedTask);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// authorization: a task can only be read, updated or deleted by its owner
const isOwner = (req, res, next) => {
  const authorized = req.task && req.auth && req.task.owner == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

export default { create, list, taskByID, read, update, remove, isOwner };
