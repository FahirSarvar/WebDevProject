import express from "express";
import taskCtrl from "../controllers/task.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/tasks")
  .get(authCtrl.requireSignin, taskCtrl.list)
  .post(authCtrl.requireSignin, taskCtrl.create);

router
  .route("/api/tasks/:taskId")
  .get(authCtrl.requireSignin, taskCtrl.isOwner, taskCtrl.read)
  .put(authCtrl.requireSignin, taskCtrl.isOwner, taskCtrl.update)
  .delete(authCtrl.requireSignin, taskCtrl.isOwner, taskCtrl.remove);

router.param("taskId", taskCtrl.taskByID);

export default router;
