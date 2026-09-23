import axios from "axios"

const getLanguageById=(lang)=>{
    const language={
        "cpp":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];
}


const submitBatch=async(submissions)=>{

    const response = await axios.post(
        "http://localhost:2358/submissions/batch",
        {
            submissions
        }
    );

    return response.data;

}



const getBatchResult = async (tokens) => {
    const response = await axios.get(
        "http://localhost:2358/submissions/batch",
        {
            params: {
                tokens: tokens.join(","),
                fields: "*"
            }
        }
    );
//  console.log(response.data);
    return response.data;
   
};


const pollBatchResult = async (tokens, { interval = 1000, maxAttempts = 30 } = {}) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const result = await getBatchResult(tokens);
        console.log(result);
        const isProcessing = result.submissions.some(({ status }) =>
            status?.id === 1 || status?.id === 2
        );

        if (!isProcessing) {
            return result;
        }

        await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error("Code execution timed out");
};

export {getLanguageById,submitBatch,getBatchResult,pollBatchResult}
