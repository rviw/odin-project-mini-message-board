const messagesStorage = require("../storages/messagesStorage");
const { body, validationResult, matchedData } = require("express-validator");

exports.messagesListGet = (req, res) => {
  res.render("pages/index", {
    title: "Mini Messageboard",
    messages: messagesStorage.getMessages(),
  });
};

exports.messagesCreateGet = (req, res) => {
  res.render("pages/form", {
    title: "New Message",
  });
};

const validateMessage = [
  body("messageUser")
    .trim()
    .notEmpty()
    .withMessage(`Author is required.`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Author must be between 1 and 20 characters.`),
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage(`Message is required.`)
    .isLength({ min: 1, max: 100 })
    .withMessage(`Message must be between 1 and 100 characters.`),
];

exports.messagesCreatePost = [
  validateMessage,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("pages/form", {
        title: "New Message",
        errors: errors.array(),
      });
    }

    const { messageUser, messageText } = matchedData(req);

    messagesStorage.addMessage({
      text: messageText,
      user: messageUser,
    });

    res.redirect("/");
  },
];

exports.messageDetailGet = (req, res) => {
  const messageId = Number(req.params.messageId);
  const message = messagesStorage.getMessage(messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("pages/message", {
    title: "Message Details",
    message,
  });
};

exports.messageDeletePost = (req, res) => {
  const messageId = Number(req.params.messageId);
  const message = messagesStorage.getMessage(messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  messagesStorage.deleteMessage(messageId);

  res.redirect("/");
};
