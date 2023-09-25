const { Message, User } = require("../models");
const io = require("../app").io;

class MessageController {
  static async getMessages(req, res, next) {
    try {
      const messages = await Message.findAll();
      if (messages.length === 0) {
        return res.status(404).json({ message: "No messages found" });
      }
      res.status(200).json(messages);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async sendMessage(req, res, next) {
    try {
      const { receiverId, content } = req.body;
      const senderId = res.locals.user.id;
      const user = await User.findByPk(receiverId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const message = await Message.create({
        senderId,
        receiverId,
        content,
      });
      io.emit("send_message", message);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getMessageReceivedByUserId(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const messages = await Message.findAll({
        where: {
          receiverId: userId,
        },
      });
      if (messages.length === 0) {
        return res.status(404).json({ message: "No messages found" });
      }
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getMessageSentByUserId(req, res, next) {
    try {
      const userId = res.locals.user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const messages = await Message.findAll({
        where: {
          senderId: userId,
        },
      });
      if (messages.length === 0) {
        return res.status(404).json({ message: "No messages found" });
      }
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = MessageController;
