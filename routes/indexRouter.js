const { Router } = require("express");

const router = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

router.get("/", (req, res) => {
  res.render("pages/index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res) => {
  res.render("pages/form", { title: "New Message" });
});

router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
});

router.get("/messages/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  const message = messages[messageId];

  if (Number.isNaN(messageId) || !message) {
    return res.status(404).send("Message not found");
  }

  res.render("pages/message", {
    title: "Message Details",
    message,
  });
});

module.exports = router;
