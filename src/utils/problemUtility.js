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

    return response.data;
};





export {getLanguageById,submitBatch,getBatchResult}


