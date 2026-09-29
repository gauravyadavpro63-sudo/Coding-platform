import desciplin from "../assets/desciplin.jpg";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { Link,useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registerUser } from "../store&slice/authSlice";
import { useEffect,useState } from "react";
import {Eye,EyeOff} from "lucide-react"

//schema validation

const signUpSchema=z.object({
  firstName:z.string().min(3,"Name should contain atleast 3 char"),
  email:z.email("Please enter valid email"),
  passward: z
  .string()
  .min(8, "Password should contain at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .regex(/^\S*$/, "Password cannot contain spaces"),
})



function Signup(){

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [showPassward,setShowPassward]=useState(false)
  const {isAuthenticated,loading,error}=useSelector((state)=>state.auth);
  const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(signUpSchema)})
 
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  },[isAuthenticated])
 
  const onSubmit=(data)=>{
      dispatch(registerUser(data));
    }
    
    return (
        
<div className="min-h-screen flex md:flex-row flex-col">

  {/* left half */}
  <div className="md:w-1/2 bg-white flex items-center justify-center flex-col  ">

  <div className="text-black text-4xl font-bold  mb-5">Sign up</div>
  <span className="text-olive-500">Already have account ? <Link to="/login" className="!text-black underline cursor-pointer">Login now</Link> </span>


    <form className="flex w-full max-w-md items-center justify-center flex-col gap-5 "onSubmit={handleSubmit(onSubmit)}>
         <div className="w-full text-black" >
          <h1>Name</h1>
        <input {...register("firstName")} placeholder="Enter your name"
         className="w-full border border-gray-400 p-3 text-black"/>
         {errors.firstName&&(<span className="text-red-800">{errors.firstName.message}</span>)}
         </div>

         <div className="w-full text-black">
          <h1>Email</h1>
        <input {...register("email")} placeholder="Enter your Email" 
         className="w-full border border-gray-400 p-3 text-black"/>
        {errors.email&&(<span className="text-red-800">{errors.email.message}</span>)}
        </div>

        <div className="w-full text-black relative">
          <h1>Passward</h1>
        <input {...register("passward")} placeholder="Enter your passward" 
         type={showPassward?"text":"password"}
         className="w-full border border-gray-400 p-3 text-black"/>
        {errors.passward&&(<span className="text-red-800">{errors.passward.message}</span>)}

           <button 
        type="button"
        onClick={()=>setShowPassward(prev=>!prev)}
        className="absolute right-3 top-[60%]   -translate-y-1/2"        
        >{showPassward?<EyeOff size={25}/>:<Eye size={25}/>} </button>
        </div>

        <button className="btn btn-wide">Sign up</button>
    </form>

  </div>


  
  {/* Right half */}
  <div className="md:w-1/2 bg-[#1f1f1f] flex items-center justify-center">
    <div className="hover-3d">
  {/* content */}
  <figure className="max-w-110 rounded-2xl">
    <img src={desciplin}/>
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

export default Signup