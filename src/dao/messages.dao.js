import { Message } from "./models/Message.model.js"

export class MessageDao {
  async find() {
    try {
      const messages = await Message.find()
      return messages
    } catch (error) {
      return error
    }
  }

  async create(newMessage) {
    try {
      const response = await Message.create(newMessage)
      return response
    } catch (error) {
      return error
    }
  }

  async deleteMany() {
    try {
      await Message.deleteMany()
      return 'Mensajes eliminados'
    } catch (error) {
      return error
    }
  }
}