import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request){
    const {email, password} = await request.json();
    try{
        // get user by email
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        // compare password
        const matched = bcrypt.compareSync(password, user.password);
        if(!matched){
            throw new Error("password not matched!");
        }

        // generate token
        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_SECRET);

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
            user: user
        });

        // set token in cookie and return response
        response.cookies.set("authToken", token, {
            expiresIn: "1d",
            httpOnly: true
        });

        return response;

    }catch(err){
        return NextResponse.json({
            message: err.message,
            success: false
        },{
            status: 500
        })
    }
}
