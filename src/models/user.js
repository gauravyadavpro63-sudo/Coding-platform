import mongoose from "mongoose";
import  {Schema} from "mongoose"
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:2,
        maxLength:20
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        immutable:true
    },
    age:{
        type:Number,
        min:6,
        max:150,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:"problem"
        }]
    },
    passward:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const user=mongoose.model("user",userSchema);
export default user;