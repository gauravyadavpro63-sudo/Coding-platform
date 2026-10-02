import {Code2,FileCode2,Trophy,MessageSquare,House,UserStar} from "lucide-react"
import { Link } from "react-router"
import { Outlet } from "react-router"
import { useDispatch,useSelector } from "react-redux"
import { logoutUser } from "../store&slice/authSlice"





function Mainlayout(){
// const name=useSelector((store)=>store.auth.user?.firstName)
const {user} =useSelector((store)=>store.auth)
const dispatch=useDispatch();

return(
    <div>
        
           {/* Header  */}
   
      <header className="h-20 w-full border-b border-zinc-800 bg-black text-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8 ">
                     {/* Logo  */}

        <div className="flex items-center gap-3">
            <Code2 size={34} strokeWidth={2.2}/>
            <span className="text-2xl font-semibold tracking-tight">BIT<span className="text-zinc-400">GODS</span></span>
        </div>

                   {/* Navigation */}

                   <nav className="flex h-full items-center  gap-15">

                {user?.role==="admin"&&(
                  <>
                        {/* Admin   */}
                    <Link to={"/admin"} className="relative flex h-full items-center gap-2 ">
                        <UserStar size={21}/>
                        <span className="text-[16px] font-medium">Admin</span>
                        
                    </Link>
                    </>
                )}
                


                       {/* Homepage  */}
                    <Link to={"/"} className="relative flex h-full items-center gap-2 ">
                        <House size={21}/>
                        <span className="text-[16px] font-medium">Homepage</span>
                        
                    </Link>



                    {/* Problem  */}
                    <Link to={"/problem"} className="relative flex h-full items-center gap-2 ">
                        <FileCode2 size={21}/>
                        <span className="text-[16px] font-medium">Problems</span>
                        
                    </Link>
                    

                    {/* Contests */}
                    <Link to={"/contests"} className="flex items-center gap-2  transition ">
                        <Trophy size={21}></Trophy>
                        <span className="text-[16px] font-medium">Contests</span>
                    </Link>


                    {/* Discuss  */}

                    <Link to={"/discuss"} className="flex items-center gap-2 transition ">
                        <MessageSquare size={21}/>
                        <span className="text-[16px] font-medium">Discuss</span>
                    </Link>


                    {/* Right side  */}

                
                      
<div className="dropdown dropdown-end">
  
  {/* User button */}
  <div
    tabIndex={0}
    role="button"
    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2
               text-white transition hover:bg-zinc-900"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800">
      <span className="text-sm font-semibold ">
        {user?.firstName?.charAt(0).toUpperCase()}
      </span>
    </div>
    <span className="font-medium ">
        
      {user?.firstName}
    </span>
  </div>

  {/* Dropdown */}
  <ul
    tabIndex={0}
    className="dropdown-content z-50 mt-2 w-48 rounded-xl border
               border-zinc-800 bg-zinc-950 p-2 shadow-xl"
  >
    <li>
       <Link to={"/login"}>
      <button
    
        onClick={() => dispatch(logoutUser())}
        className="w-full rounded-lg px-3 py-2 text-left
                   text-red-400 transition hover:bg-zinc-900
                   hover:text-red-300"
      >
        Sign out
      </button>
      </Link>
      
    </li>
  </ul>

</div>

                        

                        
  </nav>


        </div>

      </header>

       <main className="p-8">
            <Outlet/>
          </main>



    </div>
)
}

export default Mainlayout