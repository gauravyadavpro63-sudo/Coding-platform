import musashi from "../assets/mushasi.webp";
import { useForm } from "react-hook-form";



function Login(){
    const {register,handleSubmit,formState:{errors}}=useForm()
    
    
    return (
        
<div className="min-h-screen flex md:flex-row flex-col">

  {/* left half */}
  <div className="md:w-1/2 bg-white flex items-center justify-center  ">

    <form className="flex w-full max-w-md items-center justify-center flex-col gap-5 "onSubmit={handleSubmit((data)=>console.log(data))}>
        <input {...register("FirstName")} placeholder="Enter your name" className="w-full border border-gray-400 p-3 text-black"/>
        <input {...register("Email")} placeholder="Enter your Email" className="w-full border border-gray-400 p-3 text-black"/>
        <input {...register("passward")} placeholder="Enter your passward" className="w-full border border-gray-400 p-3 text-black"/>
        <button className="btn btn-wide">Login</button>
    </form>

  </div>


  
  {/* Right half */}
  <div className="md:w-1/2 bg-[#1f1f1f] flex items-center justify-center">
    <div className="hover-3d">
  {/* content */}
  <figure className="max-w-120 rounded-2xl">
    <img src={musashi}/>
  </figure>
  {/* 8 empty divs needed for the 3D effect */}
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
  </div>

</div>
        
    )
}

export default Login