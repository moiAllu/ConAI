const BACKEND_API_URL = process.env.NEXT_PUBLIC_CONAI_BACKEND_URL || "https://api.conai.me";
export  const getUserContentDetections = async (userId:string) => {
    return fetch(`${BACKEND_API_URL}/api/content-detection/detections/${userId}`,{
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
export const getContentDetectionById = async (userId:string, id:string) => {
    return fetch(`${BACKEND_API_URL}/api/content-detection/detection/${userId}/${id}`,{
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
export const createContentDetection = async (userId:string, method:string, content:string, compareTo?:string) => {
    return fetch(`${BACKEND_API_URL}/api/content-detection/detection`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            Authorization: localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({userId, method, content, compareTo}),
    }).then(res=>{
        return res.json();
    }
    )
}