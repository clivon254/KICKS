

import mongoose from "mongoose"


const couponSchema = new mongoose.Schema(
    {
        maxUses:{type:Number ,required:true},

        numUses:{type:Number ,default:0},

        expiryDate:{type:Date },

        code:{type:String , required:true},

        discount:{type:Number ,required:true}
    },
    {timestamps:true}
)


const Coupon = mongoose.model('Coupon', couponSchema)


export default Coupon