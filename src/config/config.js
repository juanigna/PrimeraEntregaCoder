import dotenv from "dotenv"

dotenv.config();

export default {
    persistense: process.env.PERSISTENCE,
}