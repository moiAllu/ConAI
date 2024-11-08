export const getUserSummarizesHistory = async (userId:string) => {
    return fetch(`http://localhost:8000/api/summarizer/summarizes/${userId}`,{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            Authorization: localStorage.getItem("accessToken") || "",
        },
    }).then(res=>{
        return res.json();
    }
    )
}
export const getUserSummarizeById = async (summarizeId:string,userId:string) => {
    return fetch(`http://localhost:8000/api/summarizer/${summarizeId}/${userId}`,{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            Authorization: localStorage.getItem("accessToken") || "",
        },
    }).then(res=>{
        return res.json();
    }
    )
}
export const createSummarize = async (intensity:string,
    content:string, 
    userId:string) => {
    return fetch(`http://localhost:8000/api/summarizer/create`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            Authorization: localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({
            intensity, 
            content, 
            userId, 
        })
    }).then(res=>{
        return res.json();
    }
    )
}