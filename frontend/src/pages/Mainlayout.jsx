import {Code2,FileCode2,Trophy,MessageSquare,BarChart3,Search} from "lucide-react"
import { Link } from "react-router"
import { Outlet } from "react-router"


function Mainlayout(){
return(
    <div>
        
           {/* Header  */}
   
      <header className="h-20 w-full border-b border-zinc-800 bg-black text-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
                     {/* Logo  */}

        <div className="flex items-center gap-3">
            <Code2 size={34} strokeWidth={2.2}/>
            <span className="text-2xl font-semibold tracking-tight">BIT<span className="text-zinc-400">GODS</span></span>
        </div>

                   {/* Navigation */}

                   <nav className="flex h-full items-center gap-10">
                    {/* Problem  */}
                    <Link to={"/problem"} className="relative flex h-full items-center gap-2 text-white">
                        <FileCode2 size={21}/>
                        <span className="text-[16px] font-medium">Problems</span>
                        
                    </Link>
                    

                    {/* Contests */}
                    <Link to={"/contests"} className="flex items-center gap-2 text-zinc-400 transition hover:text-white">
                        <Trophy size={21}></Trophy>
                        <span className="text-[16px] font-medium">Contests</span>
                    </Link>


                    {/* Discuss  */}

                    <Link to={"/discuss"} className="flex items-center gap-2 text-zinc-400 transition hover:text-white">
                        <MessageSquare size={21}/>
                        <span className="text-[16px] font-medium">Discuss</span>
                    </Link>


                    {/* Right side  */}

                    <div className="flex items-center gap-5">
                      

                        <div className="h-8 w-px bg-zinc-800">
                            {/* logout  */}
                            <button className="btn">Logout</button>
                        </div>
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