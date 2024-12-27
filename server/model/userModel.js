

import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {

    email:{type:String ,required:true} ,

    username:{type:String ,required:true} ,

    password:{type:String ,required:true} ,

    profilePicture:{type:String , default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} ,

    isAdmin:{type:Boolean , default:false} ,

    cartData:{type:Object, default:{} } ,
},
{  
    timestamps:true,
    minimize:false
})

const User = mongoose.model('User', userSchema)


export default User