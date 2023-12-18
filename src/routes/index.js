import express from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";

var router = express.Router();

router.use("/auth", authRouter).use("/task", taskRouter);

export default router;
