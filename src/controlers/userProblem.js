import Problem  from "../models/problem.js"
import {getLanguageById,submitBatch,getBatchResult} from "../utils/problemUtility.js"

// ################################################################################################################################################
                                                //CREATE PROBLEM API  
// ################################################################################################################################################
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

// #################################################################################################################################################
                                                    //   UPDATE PROBLEM API
// #################################################################################################################################################


const updateProblem=async(req,res)=>{

    const {id}=req.params;
    
    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution,problemCreator
    }=req.body;

    try{
        if(!id){
         return   res.status(400).send("Missing id field");
        }
        const DsaProblem=await Problem.findById(id);
        if(!DsaProblem){
            return res.status(404).send("id is not pressent in server");
        }
      




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


const newProblem=await Problem.findByIdAndUpdate(id,{...req.body,  problemCreator: DsaProblem.problemCreator},{runValidators:true,new:true});
res.status(200).send(newProblem);
    }
    catch(err){
    res.status(404).send(err);
    }


}


// ############################################################################################################################################
                                                    //DELETE PROBLEM API
// ############################################################################################################################################



const deleteProblem= async(req,res)=>{
const  {id}=req.params;
try{
    if(!id){
        return res.status(400).send("id is missing");
    }
    const deletedProblem=await Problem.findByIdAndDelete(id);
    if(!deletedProblem){
        return res.status(404).send("problem is missing");
    }
    res.status(200).send(deletedProblem);
}
catch(err){
    res.status(500).send(err);
}
}


// ############################################################################################################################################
                                                    //GET PROBLEM API
// ############################################################################################################################################


const getProblemById=async(req,res)=>{

const  {id}=req.params;
try{
    if(!id){
        return res.status(400).send("id is missing");
    }
    const getproblem=await Problem.findById(id).select("_id title description difficulty tags visibleTestCases startcode referenceSolution");
    if(!getproblem){
        return res.status(404).send("problem is missing");
    }
    res.status(200).send(getproblem);
}
catch(err){
    res.status(500).send(err);
}
}


const getAllProblem=async(req,res)=>{

try{
const getProblem=await Problem.find({}).select("_id title difficulty tags");
if(getProblem==0){
    return res.status(404).send("problem is missing");
}
res.status(200).send(getProblem);

}
catch(err){
  res.send(err);
}

}




export  {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem}