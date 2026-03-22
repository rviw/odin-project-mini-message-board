class MessagesStorage {
  constructor() {
    this.storage = {};
    this.id = 0;

    this.addMessage({
      user: "Amando",
      text: "Hi there!",
    });

    this.addMessage({
      text: "Hello World!",
      user: "Charles",
    });
  }

  addMessage({ text, user }) {
    const id = this.id;
    this.storage[id] = { id, text, user, added: new Date() };
    this.id++;
  }

  getMessages() {
    return Object.values(this.storage);
  }

  getMessage(id) {
    return this.storage[id];
  }
}

module.exports = new MessagesStorage();
