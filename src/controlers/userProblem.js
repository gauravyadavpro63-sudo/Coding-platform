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
            const isProcessing=result.submissions.some((submission)=>{//some() "is there at least one submission whose status is 1 or 2?
                submission.status.id===1||
                submission.status.id===2
        })
        if(!isProcessing){
            break;
        }
        await new  Promise((resolve)=>setTimeout(resolve,1000));

        
        }


   }
  


}
catch(err){
console.log(err);
}


}