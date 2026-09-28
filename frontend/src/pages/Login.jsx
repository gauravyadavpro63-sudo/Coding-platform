import musashi from "../assets/mushasi.webp";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Link,useNavigate} from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../store&slice/authSlice";


//schema validation

const loginSchema=z.object({
  email:z.email("Please enter valid email"),
  passward:z.string().min(8,"passward should contain atleast 8 character").regex(/^\S*$/, "Password cannot contain spaces"),
})



function Login(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {isAuthenticated,loading,error}=useSelector((state)=>state.auth);
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(loginSchema)})
   
    useEffect(()=>{
      if(isAuthenticated){
        navigate("/");
      }
    },[isAuthenticated])

    const onSubmit=(data)=>{
      dispatch(loginUser(data))
    }
    
    return (
        
<div className="min-h-screen flex md:flex-row flex-col">

  {/* left half */}
  <div className="md:w-1/2 bg-white flex items-center justify-center flex-col  ">
   
  <div className="text-black text-4xl font-bold  mb-5">Log In</div>
  <span className="text-olive-500">Dont have account ? <Link to="/signup"className="!text-black underline cursor-pointer">Register now</Link> </span>
  

    <form className="flex w-full max-w-md items-center justify-center flex-col gap-5 "onSubmit={handleSubmit(onSubmit)}>
       

         <div className="w-full text-black">
          <h1>Email</h1>
        <input {...register("email")} placeholder="Enter your Email" 
         className="w-full border border-gray-400 p-3 text-black"/>
        {errors.email&&(<span className="text-red-800">{errors.email.message}</span>)}
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