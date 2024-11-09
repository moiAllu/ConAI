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

