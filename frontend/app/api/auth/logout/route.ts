import { cookies } from "next/headers";
export async function GET(
  req: Request,
) {
  try {
     cookies().delete("CONAI");
     return Response.redirect("/login")
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

 
