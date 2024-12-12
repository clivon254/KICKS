
import express from "express"
import { applyCoupon, createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from "../controller/couponController.js"
import { verifyToken } from "../utils/verify.js"


const couponRouter = express.Router()


couponRouter.post("/create-coupon", verifyToken ,createCoupon)


couponRouter.post("/apply-coupon", applyCoupon)


couponRouter.get("/get-coupon/:couponId", getCoupon)


couponRouter.get("/get-coupons", verifyToken, getCoupons)


couponRouter.put("/update-coupon/:couponId", verifyToken , updateCoupon)


couponRouter.delete("/delete-coupon/:couponId", verifyToken , deleteCoupon)



export default couponRouter

