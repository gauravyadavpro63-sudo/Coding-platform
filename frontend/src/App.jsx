import { Routes,Route } from "react-router"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { checkAuth } from "./store&slice/authSlice.js"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"



function App(){

  //isAuthenticated code
  const {isAuthenticated}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth)
  },[])


  return(
    <div>
       
      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>



      </Routes>





    </div>
  )
}


export default  App