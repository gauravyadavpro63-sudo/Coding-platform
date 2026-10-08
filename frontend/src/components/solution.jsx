import { useEffect,useState } from "react"
import { ProblemSubmission } from "../api/problems"
function ProblemSubmitedByUser({id}){

    const [submissions,setSubmission]=useState(null)

    useEffect(()=>{

        const GetProblemSubmission= async ()=>{
            try{
                const data= await ProblemSubmission(id);
                console.log(data);
                setSubmission(data);      
              
              
            }
            catch{
                setSubmission(data?.response?.error);

            }
        }

      GetProblemSubmission();



    },[])



    return (
            <div className="w-full h-full bg-[#0f0f0f] text-white">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold">
          My Submissions
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Your submissions for this problem
        </p>
      </div>

      {/* Submission list */}
      <div className="p-6">

        {submissions?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-4xl mb-3">📭</div>

            <h3 className="text-gray-300 text-lg">
              No submissions yet
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Submit your solution to see it here.
            </p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded-lg overflow-hidden">

            {/* Table Header */}
            <div className="grid grid-cols-5 px-5 py-3 bg-[#171717] text-sm text-gray-400">
              <div>Status</div>
              <div>Language</div>
              <div>Runtime</div>
              <div>Memory</div>
              
            </div>

            {/* Rows */}
            {submissions?.map((submission) => (
              <div
                key={submission.id}
                className="grid grid-cols-5 px-5 py-4 border-t border-gray-800 hover:bg-[#171717] cursor-pointer transition"
              >
                {/* Status */}
                <div
                  className={
                    submission.status === "accepted"
                      ? "text-green-500 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {submission.status}
                </div>

                {/* Language */}
                <div className="text-gray-300">
                  {submission.language}
                </div>

                {/* Runtime */}
                <div className="text-gray-400">
                  {submission.runtime}
                </div>

                {/* Memory */}
                <div className="text-gray-400">
                  {submission.memory}
                </div>

              
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
    )
}


export default ProblemSubmitedByUser