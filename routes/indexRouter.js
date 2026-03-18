const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board" });
});

module.exports = indexRouter;
