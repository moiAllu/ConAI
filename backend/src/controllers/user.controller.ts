import { Request, Response } from 'express';
import {UserModel}  from "../mongodb/models" ;
import * as jwt from 'jsonwebtoken';
import {utils} from "../helpers/utils";

const cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js
    //secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: true // if you use the secret with cookieParser
};
// Login controller
export const login = async(req: Request, res: Response) => {
    // TODO: Implement login logic
    const { name, email, password } = req.body;
    try{
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }
        // Check if password is correct
        const checkPass= utils.compareHash(user.password, password);
        if(user && checkPass){
            // Generate JWT token
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            delete user.password;
            res.cookie('token', token, cookieConfig);
            // Send token to client
            return res.status(200).json({
                message: "Login successful",
                user: user,
                token: token
            });
        }

    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Signup controller
export const signup = async(req: Request, res: Response) => {
    // TODO: Implement signup logic
    const { name, email, password } = req.body;
    try{
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(user){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        // Hash password
        const hashedPassword = await utils.genSalt(10,password);
        // Create new user
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        // Generate JWT token
        const token = jwt.sign({
            email: newUser.email,
            userId: newUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        delete newUser.password;
        res.cookie('token', token, cookieConfig);
        // Send token to client
        return res.status(201).json({
            message: "Signup successful",
            user: newUser,
            token: token
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Update user controller
export const update_user =async (req: Request, res: Response) => {
    // TODO: Implement update user logic
    const {name, email, password, newPassword, phone_number, profile} = req.body;
    try{
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }
        const checkPass= utils.compareHash(user.password, password);
        // Hash password
        if(checkPass && user && newPassword){
            const hashedPassword = await utils.genSalt(10,newPassword);
        
        // Update user
        await UserModel.updateOne({
            email: email
        }, {
            name: name,
            password: hashedPassword,
            phone_number: phone_number,
            profile: profile
        });
        // Send response
        return res.status(200).json({
            message: "User updated successfully"
        });
    }
    return res.status(400).json({
        message: "Password incorrect"
    });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Delete user controller
export const delete_user = async(req: Request, res: Response) => {
    // TODO: Implement delete user logic
    const { email,password } = req.body;
    try{
        // Check if user exists
        const user = await UserModel.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }
        const checkPass= await utils.compareHash(user.password, password);
        if(!checkPass){
            return res.status(400).json({
                message: "Password incorrect"
            });
        }
        // Delete user
        await UserModel.deleteOne({
            email: email
        });
        // Send response
        res.clearCookie('token');
        return res.status(200).json({
            message: "User deleted successfully"
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const logout = async(req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(200).json({
        message: "Logout successful"
    });
}
