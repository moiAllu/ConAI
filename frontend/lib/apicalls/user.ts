export const forgotPassowrd = async (email:string) => {
    try{

        const response = await fetch(
            "http://localhost:8000/api/user/forgot-password",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                method: "POST",
            }
        );
        const data = await response.json();
        return data;
    }
    catch(e){
        return {status:500,message:"Internal server error"};
    }
}
export const resetPassword = async (password:string,verifyPassword:string,token:string) => {
    try{
        const response = await fetch(
            `http://localhost:8000/api/user/reset-password/${token}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, verifyPassword }),
                method: "POST",
            }
        );
        const data = await response.json();
        return data;
    }
    catch(e){
        return {status:500,message:"Internal server error"};
    }
}

export const logOutUser = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/logout", {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        return data;
    } catch (e) {
        return { status: 500, message: "Internal server error" };
    }
}
export const getMe= async()=>{
    try{
        const response = await fetch("http://localhost:8000/api/me", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        return data;
    }
    catch(e){
        return {status:500,message:"Internal server error"};
    }
}