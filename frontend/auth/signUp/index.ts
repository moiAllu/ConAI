import { hashPassword } from "@/lib/helper/encryption";
import { serializeCookie } from "@/lib/helper/serialize";
import { tokenization } from "@/lib/helper/token";
import { UserModel } from "@/lib/mongodb/model/userModel";

interface SignInInterface {
        name:string
        email:string,
        password: string
}
export const signUp = async ( procedure: string, { name, email, password }: SignInInterface ) => {
    // Check if user exists
    if(!name ){
      return {
        status:400,     
        message: "Please enter username",
    }
    }
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
    const user = await UserModel.findOne({
      email: email,
    });
    if (user) {
      return {
        message: "User already exists",
        status: 400,
      };
    }
    // Hash password
    const hashedPassword = await hashPassword(10, password);
    // Create new user
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    // Generate JWT token
    const token =await tokenization({user:newUser})
    await serializeCookie({name:"CONAI",token,properties:{
        httpOnly: true,
                maxAge: 8 * 60 * 60,
                path: "/",
                sameSite: false,
                secure: false,
                overwrite: true,
    }})
    // Send token to client
    return {
      message: "Signup successful",
      status: 201,
      user: newUser,
    };
}