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

    export const generateAiResponse = async (promptMods:promptMods,prompt:string,userId:string,chatId:string) => {
        return fetch(`http://localhost:8000/api/ai-writing`,{
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
        return fetch(`http://localhost:8000/api/ai-writing/writings/${userId}`,{
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
        return fetch(`http://localhost:8000/api/ai-writing/${id}/${userId}`,{
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


