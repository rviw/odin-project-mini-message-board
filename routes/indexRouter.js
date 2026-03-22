const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const indexRouter = Router();

indexRouter.get("/", messagesController.messagesListGet);
indexRouter.get("/new", messagesController.messagesCreateGet);
indexRouter.post("/new", messagesController.messagesCreatePost);
indexRouter.get("/messages/:messageId", messagesController.messageDetailGet);
indexRouter.post(
  "/messages/:messageId/delete",
  messagesController.messageDeletePost,
);

module.exports = indexRouter;
