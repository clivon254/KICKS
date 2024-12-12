

import express from "express"
import { sendMessage, subscribe } from "../controller/subscribeController.js"
import { verifyToken } from "../utils/verify.js"


const subscribeRouter = express.Router()


subscribeRouter.post('/add-subscribe', subscribe)


subscribeRouter.post('/send-message',verifyToken, sendMessage)




export default subscribeRouter