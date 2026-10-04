import { useState,useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router"
import { FetchProblemById } from "../api/problems";

import {
  ChevronDown,
  Play,
  Send,
  Clock,
  MemoryStick,
} from "lucide-react";


const Solve = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [language, setLanguage] = useState("cpp");
  const [problem,setProblem]=useState(null);
  const [loading,setLoading]=useState(true);
  const [editorCode,setEditorCode]=useState("")
  const [selectedTestCase,setSelectedTestCase]=useState(0);
  
    const { id } = useParams();


  


  const getInitialCode=(selectedLanguage)=>{
    if(!problem?.startCode) return "";

    const selectedCode=problem?.startCode.find(
      (item)=>item.language===selectedLanguage
    );
    return selectedCode?.initialCode 
  }

  useEffect(()=>{

    const ProblemId=async ()=>{
    try{
     const data = await FetchProblemById(id)
     setProblem(data);
     
    }
    catch(error){
     console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  ProblemId();
  },[id])


  useEffect(()=>{
    if(problem){
      setEditorCode(getInitialCode("cpp"))
    }
  },[problem])

  const tabs = [
    { id: "description", label: "Description" },
    { id: "editorial", label: "Editorial" },
    { id: "solution", label: "Solution" },
    { id: "submissions", label: "Submissions" },
  ];



console.log(problem);
  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold text-orange-500">
            BITGODS
          </div>

          <span className="text-zinc-600">/</span>

          <span className="text-sm text-zinc-300">
            {problem?.title}
         
          </span>
        </div>

        <div className="flex items-center gap-5 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Time</span>
          </div>

          <div className="flex items-center gap-2">
            <MemoryStick size={16} />
            <span>Memory</span>
          </div>
        </div>
      </header>


      {/* Main */}
      <div className="flex flex-1 min-h-0">

        {/* LEFT SIDE */}
        <section className="w-[45%] border-r border-zinc-800 flex flex-col min-w-0">

          {/* Tabs */}
          <div className="h-12 border-b border-zinc-800 flex items-center px-3 gap-1 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 h-full text-sm transition ${activeTab === tab.id
                    ? "text-white border-b-2 border-orange-500"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>


          {/* Left Content */}
          <div className="flex-1 overflow-y-auto p-6">

            {activeTab === "description" && (
              <div className="space-y-6">

                <div>
                  <h1 className="text-2xl font-bold mb-3">
                    {problem?.title}
                  </h1>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-xs">
                      {problem?.difficulty}
                    </span>

                    <span className="text-xs text-zinc-500">
                      {problem?.tags}
                    </span>

                 
                  </div>
                </div>

                <div className="text-sm text-zinc-300 leading-7">
                {problem?.description}
                </div>

                <div>
                 {problem?.visibleTestCases?.map((testCase, index) => (
  <div
    key={index}
    className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-4"
  >
    <p className="text-sm text-zinc-400 mb-2">
      Example {index + 1}
    </p>

    <div className="space-y-2 font-mono text-sm">
      <p>
        <span className="text-zinc-500">Input:</span>{" "}
        {testCase.input}
      </p>

      <p>
        <span className="text-zinc-500">Output:</span>{" "}
        {testCase.output}
      </p>

      {testCase.explanation && (
        <p>
          <span className="text-zinc-500">Explanation:</span>{" "}
          {testCase.explanation}
        </p>
      )}
    </div>
  </div>
))}
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    Constraints
                  </h2>

                  <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-5">
                    <li>2 ≤ nums.length ≤ 10⁴</li>
                    <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                    <li>-10⁹ ≤ target ≤ 10⁹</li>
                  </ul>
                </div>

              </div>
            )}


            {activeTab === "editorial" && (
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  Editorial
                </h1>

                <p className="text-zinc-400 leading-7">
                  The optimal approach is to use a hash map to store
                  previously visited values and check whether the
                  required complement already exists.
                </p>
              </div>
            )}


            {activeTab === "solution" && (
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  Solution
                </h1>

                <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-300 overflow-x-auto">
                  {`unordered_map<int, int> mp;

for(int i = 0; i < nums.size(); i++) {
    int need = target - nums[i];

    if(mp.count(need))
        return {mp[need], i};

    mp[nums[i]] = i;
}`}
                </pre>
              </div>
            )}


            {activeTab === "submissions" && (
              <div>
                <h1 className="text-2xl font-bold mb-5">
                  Submissions
                </h1>

                <div className="border border-zinc-800 rounded-lg overflow-hidden">

                  <div className="grid grid-cols-3 px-4 py-3 bg-zinc-900 text-xs text-zinc-500">
                    <span>Status</span>
                    <span>Language</span>
                    <span>Time</span>
                  </div>

                  <div className="grid grid-cols-3 px-4 py-4 text-sm">
                    <span className="text-green-400">
                      Accepted
                    </span>

                    <span className="text-zinc-300">
                      C++
                    </span>

                    <span className="text-zinc-500">
                      42 ms
                    </span>
                  </div>

                </div>
              </div>
            )}

          </div>
        </section>


        {/* RIGHT SIDE */}
        <section className="flex-1 flex flex-col min-w-0">

          {/* Editor Header */}
          <div className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">

            {/* Language */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => {
                  const newLanguage=e.target.value;
                  setLanguage(newLanguage)
                  setEditorCode(getInitialCode(newLanguage))
                }}
                className="appearance-none bg-zinc-900 border border-zinc-700 rounded-md pl-3 pr-8 py-1.5 text-sm text-zinc-200 outline-none cursor-pointer"
              >
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>

              <ChevronDown
                size={15}
                className="absolute right-2 top-2 pointer-events-none text-zinc-500"
              />
            </div>

            <span className="text-xs text-zinc-500">
              Auto Save
            </span>

          </div>


          {/* Monaco */}
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              theme="vs-dark"
              language={
                language==="cpp"?"cpp":language==="java"?"java":"javascript"
              }
              value={editorCode}
              onChange={(value)=>setEditorCode(value||"")}
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                automaticLayout: true,
                padding: {
                  top: 15,
                },
              }}
            />
          </div>


          {/* Test Cases */}
          <div className="h-40 border-t border-zinc-800 bg-zinc-950 shrink-0">
            {/* Test case Header  */}
            

          </div>


          {/* Bottom Actions */}
          <div className="h-16 border-t border-zinc-800 flex items-center justify-end gap-3 px-4 shrink-0">

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-900 transition"
            >
              <Play size={16} />
              Run Code
            </button>

            <button
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-sm font-medium transition"
            >
              <Send size={16} />
              Submit
            </button>

          </div>

        </section>

      </div>
    </div>
  );
};

export default Solve;