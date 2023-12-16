import express from "express";
import passport from "passport";
import TaskController from "../controllers/taskController.js";

const router = express.Router();

// Routes for managing tasks with protection middleware
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  TaskController.createTask
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TaskController.getTasks
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TaskController.updateTask
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TaskController.deleteTask
);

export default router;
