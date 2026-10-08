import axiosClient from "../utils/axiosClient";



async function Fetchallproblem(page=1,search=""){

 
        const response=await axiosClient.get(`/problem/getAllProblem?page=${page}&search=${search}`)
        return response.data
      
}


async function FetchSolvedProblem(){
        const response=await axiosClient.get("/problem/problemSolvedByUser")
        return response.data
}





async function FetchCreateProblem(data){


        const response=await axiosClient.post("/problem/create",data)
        return response.data
}



async function UpdateProblemId(data,id){

        const response =await axiosClient.put(`/problem/update/${id}`,data);
        return response.data
}



async function FetchProblemById(id){
        const response =await axiosClient.post(`/problem/problemById/${id}`)
        return response.data
}


async function DeleteProblemById(id){
        const response =await axiosClient.delete(`/problem/delete/${id}`)
        return response.data
}


async function RunCodeById(data,id){

        const response =await axiosClient.post(`/submission/runcode/${id}`,data)
        return response;
}


async function SubmitCodeById(data,id){

        const response=await axiosClient.post(`/submission/submit/${id}`,data)
        return response;
}



async function ProblemSubmission(pid){
        const response=await axiosClient.get(`/problem/submittedProblem/${pid}`)
        return response.data;
}


async function bitgodsAI(data){
        const response =await axiosClient.post(`/submission/ai`,data)
        return response.data;
}


export {Fetchallproblem,
        FetchSolvedProblem,
        FetchCreateProblem,
        UpdateProblemId,
        FetchProblemById,
        DeleteProblemById,
        RunCodeById,
        SubmitCodeById,
        ProblemSubmission,
        bitgodsAI}