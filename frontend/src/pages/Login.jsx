import musashi from "../assets/mushasi.webp";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Link} from "react-router"


//schema validation

const loginSchema=z.object({
  firstName:z.string().min(3,"Name should contain atleast 3 char"),
  emailId:z.email("Please enter valid email"),
  passward:z.string().min(8,"passward should contain atleast 8 character").regex(/^\S*$/, "Password cannot contain spaces"),
})



function Login(){
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(loginSchema)})
    
    
    return (
        
<div className="min-h-screen flex md:flex-row flex-col">

  {/* left half */}
  <div className="md:w-1/2 bg-white flex items-center justify-center flex-col  ">
   
  <div className="text-black text-4xl font-bold  mb-5">Log In</div>
  <span className="text-olive-500">Dont have account ? <Link to="/signup"className="!text-black underline cursor-pointer">Register now</Link> </span>
  

    <form className="flex w-full max-w-md items-center justify-center flex-col gap-5 "onSubmit={handleSubmit((data)=>console.log(data))}>
       

         <div className="w-full text-black">
          <h1>Email</h1>
        <input {...register("emailId")} placeholder="Enter your Email" 
         className="w-full border border-gray-400 p-3 text-black"/>
        {errors.emailId&&(<span className="text-red-800">{errors.emailId.message}</span>)}
        </div>

        <div className="w-full text-black">
          <h1>Passward</h1>
        <input {...register("passward")} placeholder="Enter your passward" 
         className="w-full border border-gray-400 p-3 text-black"/>
        {errors.passward&&(<span className="text-red-800">{errors.passward.message}</span>)}
        </div>

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