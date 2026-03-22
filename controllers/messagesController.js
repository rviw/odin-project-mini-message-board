const messagesStorage = require("../storages/messagesStorage");

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

exports.messagesCreatePost = (req, res) => {
  const { messageUser, messageText } = req.body;

  messagesStorage.addMessage({
    text: messageText,
    user: messageUser,
  });

  res.redirect("/");
};

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
