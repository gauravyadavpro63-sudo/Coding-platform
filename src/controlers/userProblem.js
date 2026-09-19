import Problem  from "../models/problem.js"
import {getLanguageById,submitBatch,getBatchResult} from "../utils/problemUtility.js"
const createProblem=async(req,res)=>{

    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution,problemCreator
    }=req.body;

try{
   for(const {language,completecode} of referenceSolution){
    //source_code
    //language_id
    //stdinput
    //expextedOutput
    const languageId=getLanguageById(language);
    const submissions=visibleTestCases.map(({input,output})=>({
         source_code:completecode,
         language_id:languageId,
         stdin:input,
         expected_output:output
    }))

        const submitResult=await submitBatch(submissions);
        const tokens=submitResult.map((result)=>result.token);
        let result;
        while(true){
            result=await getBatchResult(tokens);
            const isProcessing=result.submissions.some((submission)=>//some() "is there at least one submission whose status is 1 or 2?
                submission.status.id===1||
                submission.status.id===2
        )
        if(!isProcessing){
            break;
        }
        await new  Promise((resolve)=>setTimeout(resolve,1000));

        
        }
         for(const test of result.submissions){
            if(test.status_id!=3){
              return  res.status(400).send("error occured");
            }
         }

   }
//we can now store it in our database;
await Problem.create({
    ...req.body,
    problemCreator:req.result._id
})
res.status(201).send("problem saved successully")
  


}
catch(err){
res.status(400).send(err);

}


}


export default createProblem