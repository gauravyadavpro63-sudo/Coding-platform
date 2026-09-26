import desciplin from "../assets/desciplin.jpg";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { Link } from "react-router";


//schema validation

const signUpSchema=z.object({
  firstName:z.string().min(3,"Name should contain atleast 3 char"),
  emailId:z.email("Please enter valid email"),
  passward:z.string().min(8,"passward should contain atleast 8 character").regex(/^\S*$/, "Password cannot contain spaces"),
})



function Signup(){
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:zodResolver(signUpSchema)})
    
    
    return (
        
<div className="min-h-screen flex md:flex-row flex-col">

  {/* left half */}
  <div className="md:w-1/2 bg-white flex items-center justify-center flex-col  ">

  <div className="text-black text-4xl font-bold  mb-5">Sign up</div>
  <span className="text-olive-500">Already have account ? <Link to="/login" className="!text-black underline cursor-pointer">Login now</Link> </span>


    <form className="flex w-full max-w-md items-center justify-center flex-col gap-5 "onSubmit={handleSubmit((data)=>console.log(data))}>
         <div className="w-full text-black" >
          <h1>Name</h1>
        <input {...register("firstName")} placeholder="Enter your name"
         className="w-full border border-gray-400 p-3 text-black"/>
         {errors.firstName&&(<span className="text-red-800">{errors.firstName.message}</span>)}
         </div>

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