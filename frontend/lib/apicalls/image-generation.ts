interface Data {
    prompt:string,
    aspect:string, 
    style:string, 
    background:string,
    color:string, 
}
export const createImage = async (data:Data,userId:string) => {
    return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/generate-image`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
            Authorization: localStorage.getItem("accessToken") || "",
        },
        body: JSON.stringify({data,userId}),
    }).then(res=>{
        return res.json();
    }
    )
}
export const getImageById = async (imageId:string,userId:string) => {
    return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+ `/api/image/${imageId}/${userId}`,{
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
export const getUserImages = async (userId:string) => {
    return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/image-generation/images/${userId}`,{
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
export const deleteImage = async (id:string,userId:string) => {
    return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/image/${id}/${userId}`,{
        method:"DELETE",
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
export const downloadImageEndPoint = async (imageId:string,resolution:string) => {
    return fetch(process.env.NEXT_PUBLIC_CONAI_BACKEND_URL+`/api/image/download/${imageId}/${resolution}`,{
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