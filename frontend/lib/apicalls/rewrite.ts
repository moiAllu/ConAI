export const getUserRewritesHistory = async (userId:string) => {
    console.log("Ali",userId);
    return fetch(`http://localhost:8000/api/rewrite/rewrites/${userId}`,{
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
export const getUserRewriteById = async (rewriteId:string,userId:string) => {
    return fetch(`http://localhost:8000/api/rewrite/${rewriteId}/${userId}`,{
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