import { signIn } from '@/auth'
 
export async function POST(
  req: Request,
) {
  try {
    const { email, password } = await req.json();
    const response = await signIn('credentials', { email, password }) as any 
    if(response?.status === 200){
       return Response.json({ 
        status: 200,
        message:response.message,
        user: response.user,
        token: response.token
        },{
            headers:{
                "Content-Type":"application/json",
            },
            status:200
        })
    }
    return Response.json({
        status:400,
        message: response?.message
    },{status:400,statusText:response.message})
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