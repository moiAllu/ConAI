interface promptMods {
    inputFormat: string,
    inputType : string,
    inputTone : string,
    inputAgeGroup : string,
    inputLength : string, 
  };
  const BACKEND_API_URL = process.env.NEXT_PUBLIC_CONAI_BACKEND_URL || "https://api.conai.me";

    export const generateAiResponse = async (promptMods:promptMods,prompt:string,userId:string,chatId:string) => {
        return fetch(`${BACKEND_API_URL}/api/ai-writing`,{
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
        return fetch(`${BACKEND_API_URL}/api/ai-writing/writings/${userId}`,{
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
        return fetch(`${BACKEND_API_URL}/api/ai-writing/${id}/${userId}`,{
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
    export const deleteAiWritingById= (id:string, userId:string)=>{
        return fetch(`${BACKEND_API_URL}/api/ai-writing/${id}/${userId}`,{
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