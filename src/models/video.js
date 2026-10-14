import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    publicId:{
        type:String,
        required:true,
        unique:true,
    },
    duration:{
        type:Number,
        default:0,
    },
    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"problem",
        default:null,
    }
},
{timestamps:true}
)


const Video=mongoose.model("Video",videoSchema);

export default Video;