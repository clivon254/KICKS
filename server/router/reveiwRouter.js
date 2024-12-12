

import express from "express"
import { AddReveiw, deleteReveiw, getReveiw, getReveiws, updateReveiw } from "../controller/reveiwController.js"
import { verifyToken } from "../utils/verify.js"


const reveiwRouter = express.Router()


reveiwRouter.post('/add-reveiw',verifyToken ,AddReveiw)


reveiwRouter.get('/get-reveiw/:reveiwId', getReveiw)


reveiwRouter.get('/get-reveiws/:productId' , getReveiws)


reveiwRouter.put('/update-reveiw/:reveiwId',verifyToken , updateReveiw)


reveiwRouter.delete('/delete-reveiw/:reveiwId',verifyToken , deleteReveiw)



export default reveiwRouter