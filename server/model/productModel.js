
import mongoose from "mongoose"


const productSchema = new mongoose.Schema(
    {
        name:{type:String , required:true},

        category:{type:String , required:true},

        brand:{type:String , required:true},

        regularPrice:{type:Number , required:true},

        discountPrice:{type:Number , required:true},

        description:{type:String , required:true},

        images:{type:Array , required:true},

        instock:{type:Number , required:true},

        feature:{type:Boolean , default:false},

        latest:{type:Boolean , default:false},

        offer:{type:Boolean , default:false},

        rate:{type:Number , default:5 },

        sizes:{type:Array , default:undefined},

        colors:{type:Array , default:undefined}
    },
    {timestamps:true}
)


const Product = mongoose.model('Product', productSchema)


export default Product