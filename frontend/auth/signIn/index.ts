import { CompareHash } from "@/lib/helper/encryption";
import { serializeCookie } from "@/lib/helper/serialize";
import { tokenization } from "@/lib/helper/token";
import { UserModel } from "@/lib/mongodb/model/userModel";
interface SignInInterface {
        email:string,
        password: string
}
export const signIn = async ( procedure: string, { email, password }: SignInInterface ) => {
    try {
      // Check if user exists
      if(!email ){
        return {
          status:400,     
          message: "Please enter email",
      }
      }
      if(!password){
        return {
          status:400,     
          message: "Password cannot be empty",
      }
      }
      let user = await UserModel.findOne({
        email: email,
      });
      if (!user) {
        return {
            status:400,     
            message: "User not found",
        }
      }
      // Check if password is correct
      // const checkPass= utils.compareHash(user.password, password);
      if(CompareHash({compare:password,comparedTo:user.password})){
        user.password = "";
        const token = await tokenization({user})
        await serializeCookie({name:"CONAI",token,properties:{
            httpOnly: true,
                    maxAge: 8 * 60 * 60,
                    path: "/",
                    sameSite: false,
                    secure: false,
                    overwrite: true,
        }})
       const response = {
        status: 200,
        message: "Login successful",
        user: user,
        token:token,
     }
    return response;
      }

      } catch (e) {
      console.log(e);
      const response = {
        status: 500,
        message: e,
    }
    return response;
    }
}