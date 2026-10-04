import { Routes,Route } from "react-router"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { checkAuth } from "./store&slice/authSlice.js"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { Navigate } from "react-router"
import Discuss from "./pages/Discuss.jsx"
import Contests from "./pages/Contests.jsx"
import Mainlayout from "./pages/Mainlayout.jsx"
import Problem from "./pages/Problem.jsx"
import AdminDashboard from "./admin/adminDashboard.jsx"
import CreateProblem from "./admin/createProblme.jsx"
import UpdateProblem from "./admin/updateProblem.jsx"
import DeleteProblem from "./admin/deleteProblem.jsx"
import UpdateProblemId from "./admin/updateProblemId.jsx"
import Solve from "./pages/Solve.jsx"





function App(){

  //isAuthenticated code
  const {isAuthenticated,loading,user}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[])

  if(loading){
    return (
      
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }


  return(
    <div>
       
      <Routes>
      <Route element={<Mainlayout/>}>
      <Route path="/" element={isAuthenticated?<Homepage/>:<Navigate to="/signup"></Navigate>}/>
      <Route path="/problem" element={<Problem/>}></Route>
      <Route path="/discuss" element={<Discuss/>}></Route>
      <Route path="/contests" element={<Contests/>}></Route>
      <Route path="/admin" element={user?.role==="admin"?<AdminDashboard/> : <Navigate to="/"></Navigate>}></Route>
      <Route path="/admin/create" element={<CreateProblem/>}></Route>
      <Route path="/admin/update" element={<UpdateProblem/>}></Route>
      <Route path="/admin/delete" element={<DeleteProblem/>}></Route>
      <Route path="/admin/update/:id" element={<UpdateProblemId/>}></Route>
      <Route path="/solve/:id" element={<Solve/>}></Route>
      </Route>

      <Route path="/login" element={isAuthenticated?<Navigate to="/"></Navigate> :<Login/>}/>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/"></Navigate> :<Signup/>}/>
       


      </Routes>





    </div>
  )
}


export default  App