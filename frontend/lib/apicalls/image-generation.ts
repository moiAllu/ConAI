interface Data {
    prompt:string,
    aspect:string, 
    style:string, 
    background:string,
    color:string, 
}
export const createImage = async (data:Data,userId:string) => {
    return fetch(`http://localhost:8000/api/generate-image`,{
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
    return fetch(`http://localhost:8000/api/image/${imageId}/${userId}`,{
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
    return fetch(`http://localhost:8000/api/image-generation/images/${userId}`,{
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
    return fetch(`http://localhost:8000/api/image/${id}/${userId}`,{
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