import { getVideoById } from "../api/video"
import { useState,useEffect } from "react"

function Homepage(){

    const [video,setVideo]=useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
   const id="6ad21e06ece0ae0f910a1383"

    useEffect(()=>{
        async function fetchVideo(){
            try{
                setLoading(true);
                setError("");
                setVideo(null);
                const data=await getVideoById(id);
                 
                setVideo(data);
            }catch(error){
                setError(
                    error.response?.data?.message|| "unable to load data"
                )
            }finally{
                setLoading(false);
            }
        }

        fetchVideo();
    },[])

    if(loading){
        return(
             <div>Loading video....</div>
        )
    }

    if(error||!video){
        return(
            <div className="py-10 text-center text-gray-500">
                {error||"video not found "}
            </div>
        )
    }


return(
    <div>
        
   <video 
     className="w-full h-[calc(100vh-64px)] object-cover bg-black"
  autoPlay
  loop
  playsInline
  preload="auto">
    <source src={video.videoUrl} type="video/mp4"/>
   </video>


    </div>
)
}

export default Homepage