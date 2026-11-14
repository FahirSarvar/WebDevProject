import express from "express";
import itemCtrl from "../controllers/item.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/items")
  .get(authCtrl.requireSignin, itemCtrl.list)
  .post(authCtrl.requireSignin, itemCtrl.create);

router
  .route("/api/items/:itemId")
  .get(itemCtrl.read)
  .put(authCtrl.requireSignin, itemCtrl.isOwner, itemCtrl.update)
  .delete(authCtrl.requireSignin, itemCtrl.isOwner, itemCtrl.remove);

router.param("itemId", itemCtrl.itemByID);

export default router;
