import Problem from "../models/problem.js";
import Submission from "../models/submission.js"
import { getLanguageById, submitBatch, pollBatchResult } from "../utils/problemUtility.js";
const submitCode=async(req,res)=>{

try{
const userId=req.result._id;
const problemId=req.params.id;
const {code,language}=req.body;

if (!userId) {
    return res.status(400).send("userId missing");
}

if (!code) {
    return res.status(400).send("code missing");
}

if (!problemId) {
    return res.status(400).send("problemId missing");
}

if (!language) {
    return res.status(400).send("language missing");
}

//fetch the problem from database
const problem=await Problem.findById(problemId);//testcases(hidden)

//first store submission before sending to judg0 as it may not give input so we will have data of submitted code atleast

const submittedResult=await Submission.create({
    userId,
    problemId,
    code,
    language,
    status:"pending",
    testCasesTotal:problem.hiddenTestCases.length
})

//now give code to judge0
const languageId=getLanguageById(language);
    const submissions=problem.hiddenTestCases.map(({input,output})=>({
         source_code:code,
         language_id:languageId,
         stdin:input,
         expected_output:output
    }))

    const submitResult=await submitBatch(submissions);
    const tokens=submitResult.map((result)=>result.token);
     const result=await pollBatchResult(tokens);

    //submittedResult ko update karo
      let testCasesPassed=0;
      let runtime=0;
      let memory=0;
      let status="accepted";
      let errorMessage=null;
      for(const test of result.submissions){
         if(test.status?.id===3){
            testCasesPassed++;
            runtime=runtime+parseFloat(test.time);
            memory=Math.max(memory,test.memory);
             
         }
         else if(test.status?.id===4){
            status="wrong";
            errorMessage=test.stderr
         }
  
         else{
            status="error"
            errorMessage=test.stderr;
         }
      }    

      //store the result in db

      submittedResult.status=status;
      submittedResult.testCasesPasses=testCasesPassed;
      submittedResult.errorMessage=errorMessage;
      submittedResult.runtime=runtime;
      submittedResult.memory=memory;


      await submittedResult.save();

    //problem lo insert karenge userSchema ke problemSolved mein if it is not present there
    if(!req.result.problemSolved.includes(problemId)){
       req.result.problemSolved.push(problemId);
       await req.result.save()  ;
    }

      res.status(201).send(submittedResult)

}
catch(err){
res.status(500).send(err.message);
}



}




const runCode=async(req,res)=>{
    try{
const userId=req.result._id;
const problemId=req.params.id;
const {code,language}=req.body;

if (!userId) {
    return res.status(400).send("userId missing");
}

if (!code) {
    return res.status(400).send("code missing");
}

if (!problemId) {
    return res.status(400).send("problemId missing");
}

if (!language) {
    return res.status(400).send("language missing");
}

//fetch the problem from database
const problem=await Problem.findById(problemId);//testcases(hidden)



//now give code to judge0
const languageId=getLanguageById(language);
    const submissions=problem.visibleTestCases.map(({input,output})=>({
         source_code:code,
         language_id:languageId,
         stdin:input,
         expected_output:output
    }))

    const submitResult=await submitBatch(submissions);
    const tokens=submitResult.map((result)=>result.token);
     const result=await pollBatchResult(tokens);

    
  
    

      res.status(201).send(result)

}
catch(err){
res.status(500).send(err.message);
}
}

export {submitCode,runCode}