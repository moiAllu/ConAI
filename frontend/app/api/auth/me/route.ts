import { verifyToken } from "@/lib/helper/token";

export async function GET (

  req: Request,
) {
  try {
    const token = req.headers.get("accessToken")
    if (!token) {
    return Response.json({
        message: 'Unauthorized',
        status: 401,
    });
    }
    const user= verifyToken(token)
    if(user){
       return Response.json({ 
        status: 200,
        message:"user sent",
        },{
            headers:{
                "Content-Type":"application/json",
            },
            status:200
        })
    }
    return Response.json({
        status:400,
        message: "error getting user"
    },{status:400,statusText:"error getting user"})
  } catch (error:any) {
    return Response.json({
        status:500,
        message: error
  },{
    status:500,
    statusText:error
  })

  }
}