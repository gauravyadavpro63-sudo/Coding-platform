import Problem from "../models/problem.js";
import Submission from "../models/submission.js"
import { getLanguageById, submitBatch,getBatchResult } from "../utils/problemUtility.js";
const submitCode=async(req,res)=>{

try{
const userId=req.result._id;
const problemId=req.params.id;
const {code,language}=req.body;

if(!userId||!code||!problemId||!language){
    return res.status(400).send("some field missing");
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
     const  result=await getBatchResult(tokens);

    //submittedResult ko update karo
      let testCasesPassed=0;
      let runtime=0;
      let memory=0;
      let status="accepted";
      let errorMessage=null;
      for(const test of result){
         if(test.status_id==3){
            testCasesPassed++;
            runtime=runtime+parseFloat(test.time);
            memory=Math.max(memory,test.memory);
             
         }
         else if(test.status_id==4){
            status="wrong";
            errorMessage=test.stderr
         }
         else if(test.status_id==1||test.status_id==2){
            status="pending";
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
      res.status(201).send(submittedResult)
}
catch(err){
res.status(500).send(err);
}



}


export {submitCode}