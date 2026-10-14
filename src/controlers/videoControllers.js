import Video from "../models/video.js";


// save video 

 const saveVideo=async(req ,res)=>{
    try{
        const {title,videoUrl,publicId,duration,problemId}=req.body;
        if(!title?.trim()||!videoUrl||!publicId){
            return res.status(400).json({
                success:false,
                message:"Title,video URL  and public Id are required",

            })
    
        }
        //basic url validation 
        const parsedUrl=new URL(videoUrl);
        if( parsedUrl.protocol!=="https:"||
            parsedUrl.hostname!=="res.cloudinary.com"
        ){
           return res.status(400).json({
            success:false,
            message:"invalid video URL",
           })
        }

        const video =await Video.create({
            title:title.trim(),
            videoUrl,
            publicId,
            duration:Number(duration)||0,
            problemId:problemId||null,
        })
        return res.status(201).json({
            success:true,
            message:"video metadata saved",
            video,
        })
    }
    catch(error){
        if(error.code===11000){
            return res.status(409).json({
                success:false,
                message:"This vidos has already been saved"
            })
        }
        return res.status(500).json({
            success:false,
            message:"Faild to save video"
        })
    }
}




    //getVideos


    const  getVideos=async(req,res)=>{
        try{
            const videos= await Video.find().sort({createdAt:-1}).lean();
           return res.status(200).json({
            success:true,
            videos
           })
        }
        catch(error){
        console.log("error");
        return res.status(500).json({
            success:false,
            message:"failed to fetch videos"
        })
        }
    }

    export {saveVideo,getVideos}

