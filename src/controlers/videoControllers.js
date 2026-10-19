import { randomUUID } from "node:crypto";
import mongoose from "mongoose";

import cloudinary from "../config/cloudinary.js";
import Video from "../models/video.js";

const MAX_VIDEO_SIZE = 100 * 1024 * 1024

const ALLOWED_FORMATS = new Set([
    "mp4",
    "mov",
    "webm",
    "m4v",
])

const uploadSignature = async (req, res) => {
    try {
        const timestamp = Math.floor(Date.now() / 1000);

        //Generate the public ID on the backend
        const publicId = `admin-videos/${randomUUID()}`;

        const params = {
            timestamp,
            public_id: publicId,
            overwrite: false,

        }

        const signature = cloudinary.utils.api_sign_request(
            params,
            process.env.CLOUDINARY_API_SECRET,
        )

        res.json({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            timestamp,
            publicId,
            overwrite: false,
            signature,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to generate upload signature"
        })
    }
}



const saveVideo = async (req, res) => {

    //verify the uploaded asset and save video metadata
    try {
        const { publicId, assetId, title, description = "" } = req.body;

        if (typeof publicId !== "string" ||
            typeof assetId !== "string" ||
            typeof title !== "string" ||
            !title.trim() ||
            title.trim().length > 120 ||
            typeof description !== "string" ||
            description.length > 2000
        ) {
            return res.status(400).json({
                message: "invalid video details"
            })
        }

        //verify the asset using cloudinary
        let asset;
        try {
            asset = await cloudinary.api.resource(publicId, {
                resource_type: "video"
            })
        } catch (error) {
            if (
                error?.http_code === 404 ||
                error?.error?.http_code === 404
            ) {
                return res.status(400).json({
                    message: "video not found in Cloudinary"
                })
            }
            throw error
        }

        if (asset.public_id !== publicId || asset.asset_id !== assetId || asset.resource_type !== "video") {
            return res.status(400).json({
                message: "cloudinary asset verification failed"
            })
        }

        const format = String(asset.format ?? "").toLowerCase();
        const bytes = Number(asset.bytes);

        if (
            !asset.secure_url ||
            !ALLOWED_FORMATS.has(format) ||
            !Number.isFinite(bytes) ||
            bytes <= 0
        ) {
            return res.status(400).json({
                message: "Invalid video format or asset",
            });
        }


      if (bytes > MAX_VIDEO_SIZE) {
        return res.status(413).json({
          message: "Maximum video size is 100 MB",
        });
      }

      // Prevent duplicate saves on retries.
      const existing = await Video.findOne({
        cloudinaryPublicId: publicId,
      });

      if (existing) {
        return res.status(200).json({
          message: "Video already saved",
          video: existing,
        });
      }

      const video = await Video.create({
        title: title.trim(),
        description: description.trim(),
        uploadedBy: req.result._id,
        cloudinaryPublicId: asset.public_id,
        cloudinaryAssetId: asset.asset_id,
        videoUrl: asset.secure_url,
        format,
        bytes,
        duration: Number.isFinite(Number(asset.duration))
          ? Number(asset.duration)
          : null,
      });

      return res.status(201).json({
        message: "Video uploaded successfully",
        video,
      });
    } catch (error) {
      console.error("Video finalization error:", error);


      if (error?.code === 11000) {
        return res.status(409).json({
          message: "This video has already been saved",
        });
      }

        return res.status(500).json({
        message: "Failed to save video",
      });
    }
}



const getVideo=async(req,res)=>{
try{
    const {id}=req.params;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            message:"invalid video id"
        })
    }

    const video=await Video.findById(id).select("videoUrl");

    if(!video){
        return res.status(404).json({
            success:false,
            message:"video not found",
        })
    }
    return res.status(200).json({
        success:true,
        video,
    })
}catch(error){
    return res.status(500).json({
        success:false,
        message:"failed to fetch video"
    })
}
}

export { uploadSignature,saveVideo,getVideo }
