import axiosClient from "../utils/axiosClient";



async function Fetchallproblem(page=1){

 
        const response=await axiosClient.get(`/problem/getAllProblem?page=${page}`)
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





export {Fetchallproblem,
        FetchSolvedProblem,
        FetchCreateProblem,
        UpdateProblemId,
        FetchProblemById,
        DeleteProblemById}