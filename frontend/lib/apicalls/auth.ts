"use client";
// export default function auth(url:string,data:any,method:string){
//     return fetch(`http://localhost:8000/api${url}`,{
//         method:data? method:"GET",
//         credentials:"include",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body: JSON.stringify(data),
//     }).then(res=>{
//         return res.json();
//     })
// }
interface promptMods {
    inputFormat: string,
    inputType : string,
    inputTone : string,
    inputAgeGroup : string,
    inputLength : string, 
  };
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_CONAI_BACKEND_URL || "https://api.conai.me";
  
    export const generateAiResponse = async (promptMods:promptMods,prompt:string,userId:string,chatId:string) => {
        return fetch(BACKEND_API_URL+`/api/ai-writing`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("accessToken") || "",
            },
            body: JSON.stringify({promptMods,prompt,userId,chatId}),
        }).then(res=>{
            return res.json();
        })
    }
    export const getUserAiWritings = async (userId:string) => {
        return fetch(BACKEND_API_URL+`/api/ai-writing/writings/${userId}`,{
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
    export const  getAiWritingById = async (id:string,userId:string) => {
        return fetch(BACKEND_API_URL+`/api/ai-writing/${id}/${userId}`,{
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
    export  const getUserContentDetections = async (userId:string) => {
        return fetch(BACKEND_API_URL+`/api/content-detection/detections/${userId}`,{
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
        return fetch(BACKEND_API_URL+`/api/content-detection/detection/${userId}/${id}`,{
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
        return fetch(BACKEND_API_URL+`/api/content-detection/detection`,{
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
    export const updateUserApi = async (email:string, username:string, bio:string) => {
        return fetch(BACKEND_API_URL+`/api/user/update`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                Authorization: localStorage.getItem("accessToken") || "",
            },
            body: JSON.stringify({email, username, bio}),
        }).then(res=>{
            return res.json();
        }
        )
    }




