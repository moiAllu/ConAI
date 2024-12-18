import { cookies } from "next/headers";
export async function GET(
  req: Request,
) {
  try {
     cookies().delete("CONAI");
     return Response.json({
      status: 200,
      message: "Logout successful",
    },{
      status: 200,
      statusText:"Logout successful",
    });
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

 
