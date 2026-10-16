import axiosClient from "../utils/axiosClient";
import axios from "axios";


export async function uploadVideoToCloudinary(file,onProgress){
    //ask backend for signed upload parameter.
    const {data:signed}=await axiosClient.post("/video/signature")
    const formData=new FormData();


  formData.append("file", file);
  formData.append("api_key", signed.apiKey);
  formData.append("timestamp", String(signed.timestamp));
  formData.append("public_id", signed.publicId);
  formData.append("overwrite", String(signed.overwrite));
  formData.append("signature", signed.signature);

const url =
    `https://api.cloudinary.com/v1_1/` +
    `${encodeURIComponent(signed.cloudName)}/video/upload`;



const {data:asset}=await axios.post(url,formData,{
    onUploadProgress(event){
        if(event.total&&onProgress){
            onProgress(
                Math.round((event.loaded/event.total)*100)
            )
        }
    }
})
return {
    publicId:signed.publicId,
    assetId:asset.asset_id,
}
}


export async function saveVideoMetadata({
    title,
    description,
    publicId,
    assetId
}){
   const {data}=await axiosClient.post("/video/savevideo",{
    title,
    description,
    publicId,
    assetId
   })

   return data.video;
}


export async function getVideoById(id){
    const response=await axiosClient.get(`/video/getvideo/${id}`)
    return response.data.video;
    
}