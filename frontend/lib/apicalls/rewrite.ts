export const getUserRewritesHistory = async (userId:string) => {
    console.log("Ali",userId);
    return fetch( process.env.NEXT_PUBLIC_CONAI_BACKEND_URL +`/api/rewrite/rewrites/${userId}`,{
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
    return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/rewrite/${rewriteId}/${userId}`,{
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
export const createRewrite = async (intensity:string, 
    mode:string, 
    inputLanguage:string, 
    content:string, 
    userId:string, 
    model:string) => {
    return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/rewrite/create`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            Authorization: localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({
            intensity, 
            mode, 
            inputLanguage, 
            content, 
            userId, 
            model
        })
    }).then(res=>{
        return res.json();
    }
    )
}