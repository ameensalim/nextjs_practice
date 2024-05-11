import { strict } from "assert"
import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: [true, "please provide username"],
        unique:true
    }, 
    email: {
        type:String,
        required: [true, "please provide email"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "please enter password"]
    }, 
    isVerified:{
        type: Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date 

})
const user = mongoose.models.users2 || mongoose.model('users2', userSchema)

export default user;