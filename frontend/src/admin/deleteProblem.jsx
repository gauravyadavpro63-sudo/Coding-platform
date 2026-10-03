

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Fetchallproblem,DeleteProblemById } from "../api/problems";


const DeleteProblem = () => {
    const [problems, setProblems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
  

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);

                const response = await Fetchallproblem(page)

                setProblems(response?.getProblem);
                setTotalPages(response?.totalPages);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [page]);


    const deleteProblem=async (id)=>{
      try{
        const response= await DeleteProblemById(id)
        alert("problem deleted succesfully ")
        navigate("/admin")
      }
      catch(err){
        alert("can not delete sorry")
      }
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">

            <h1 className="text-3xl font-bold mb-6">
                Delete problem
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="space-y-4">

                    {problems.map((problem) => (
               <div
    key={problem._id}
    className="border border-gray-800 bg-[#111] rounded-xl p-5 flex justify-between items-center hover:border-gray-600 transition"
>
    <div>
        <h2 className="text-xl font-semibold mb-3">
            {problem.title}
        </h2>

        <div className="flex items-center gap-3 flex-wrap">

            {/* Difficulty */}
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                        problem.difficulty === "easy"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : problem.difficulty === "medium"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }
                `}
            >
                {problem.difficulty}
            </span>

            {/* Tags */}
         
             <span className="px-3 py-1 rounded-full text-sm bg-white/5 text-gray-300 border border-gray-700">
        {problem.tags}
    </span>

        </div>
    </div>

    <button
       onClick={()=>deleteProblem(problem._id)}
        className="px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
    >
        Delete
    </button>
</div>
                    ))}

                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-8">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40"
                >
                    Previous
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default DeleteProblem;