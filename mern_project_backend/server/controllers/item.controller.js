import Item from "../models/item.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
  try {
    const item = new Item(req.body);
    item.owner = req.auth._id; // set from the signed-in user's token
    await item.save();
    return res.status(200).json(item);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const itemByID = async (req, res, next, id) => {
  try {
    const item = await Item.findById(id);
    if (!item) return res.status(400).json({ error: "Item not found" });
    req.item = item;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve item" });
  }
};

const read = (req, res) => {
  return res.json(req.item);
};

const update = async (req, res) => {
  try {
    let item = extend(req.item, req.body);
    item.updated = Date.now();
    await item.save();
    res.json(item);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    const deletedItem = await req.item.deleteOne();
    res.json(deletedItem);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// authorization: only the owner of the item can update or delete it
const isOwner = (req, res, next) => {
  const authorized = req.item && req.auth && req.item.owner == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

export default { create, list, itemByID, read, update, remove, isOwner };
