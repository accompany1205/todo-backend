import express from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";

var router = express.Router();

router.use("/auth", authRouter).use("/task", taskRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "asdf" });
});

export default router;
