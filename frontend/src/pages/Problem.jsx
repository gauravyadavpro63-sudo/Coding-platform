import { useEffect, useState } from "react";
import tired from "../assets/tired.jpg"
import { useDispatch,useSelector } from "react-redux"
import { Fetchallproblem,FetchSolvedProblem} from "../api/problems";


function Problem(){

    const [problems,setProblems]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [problemType,setProblemType]=useState("all");
    const [tag,setTag]=useState("all");
    const [difficulty,setDifficulty]=useState("all");
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);


    useEffect(()=>{
        const getAllProblems=async()=>{
          setLoading(true);
          setError(null);
            try{
              let data;
              if(problemType==="all"){
                 data=await Fetchallproblem(page);
                 setTotalPages(data.totalPages);
                  setProblems(data.getProblem);

              }
              else{
                data=await FetchSolvedProblem();
                setTotalPages(1);
                setProblems(data);

              }
            }
            catch(err){
      
                setError(err.response?.data?.message||"failed to fetch problem")
            }
            finally{
                setLoading(false);
            }
        }

        getAllProblems();

    },[problemType,page])

    if(loading){
        return (
            <div>Loading problems</div>
        )
    }
    if(error){
        return (
            <div>{error}</div>
        )
    }

      //filter

    const filteredProblems=problems.filter((problem)=>{
      const tagMatch= tag==="all"||problem.tags.includes(tag);

      const difficultyMatch= difficulty==="all"||problem.difficulty===difficulty;

      return tagMatch&&difficultyMatch;
    })







    return(
        <div className="grid grid-cols-3 min-h-screen">

           {/* Problems */}

           <div className="col-span-2">

       <div className="flex justify-between items-center">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-white"> Problems</h1>
                      {/* filter ui */}
      <div className="flex flex-wrap item-center gap-3 mb-8">
         
         <select 
                value={problemType}
                onChange={(e)=>setProblemType(e.target.value)}
                className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-90 bg-black"
          >     
             <option value="all">All Problem</option>
             <option value="solved">Solved Problems</option>

         </select>



         <select
               value={tag}
               onChange={(e)=>setTag(e.target.value)}
              className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-90 bg-black"

          >
               <option value="all">All Tags</option>
               <option value="array">Array</option>
               <option value="linkedlist">Linked list</option>
               <option value="graph">Graph</option>
               <option value="dp">DP</option>

         </select>


         <select
                value={difficulty}
                onChange={(e)=>setDifficulty(e.target.value)}
                className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-90 bg-black"

                >
                  <option value="all">All Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>

         </select>

         





      </div>
     </div>
      

      {filteredProblems.map((problem) => (
  <div
    key={problem._id}
    className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-5 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-900"
  >
    <div>
      <h2 className="text-lg font-semibold text-white group-hover:text-blue-400">
        {problem.title}
      </h2>

      <span className="mt-3 inline-block rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
        {problem.tags}
      </span>
    </div>

    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        problem.difficulty === "easy"
          ? "bg-green-500/10 text-green-400"
          : problem.difficulty === "medium"
          ? "bg-yellow-500/10 text-yellow-400"
          : "bg-red-500/10 text-red-400"
      }`}
    >
      {problem.difficulty}
    </span>
  </div>
))}


  {/* pagination */}

   <div>
    {problemType==="all"&&(
      <div className="flex justify-center items-center gap-3 mt-8">
             <button
                   disabled={page===1}
                   onClick={()=>setPage(page-1)}
                   className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed">
                         Previous
             </button>
             <span className="text-zinc-300">Page {page} of {totalPages}</span>

             <button
                   disabled={page===totalPages}
                   onClick={()=>setPage(page+1)}
                    className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowded"
                     >
                      Next
                </button>
      </div>
    )}
   </div>




           </div>




           {/* motivation  */}





           <div className="col-span-1 border-l border-zinc-800 ml-5 ">
            <div className="sticky top-6">

            <div className="hover-3d">
  {/* content */}
  <figure className="max-w-100 rounded-2xl ">
    <img src={tired} alt="3D card" />
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
</div></div>
        </div>
        </div>
    )
}


export default Problem