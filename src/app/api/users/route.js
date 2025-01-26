import { User } from "@/models/user";
import { dbConnect } from "@/helper/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// database connection
dbConnect();

// creating a new user (Signup)
export async function POST(request) {
    const {name, email, password, about, profileUrl} = await request.json();
    const user = new User({
        name,
        email,
        password,
        about,
        profileUrl
    });
    try{
        // hashSync is synchronous function thereforn we don't need to use await. but in hash we need to use await
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT));
        const createdUser = await user.save();
        return NextResponse.json(user,{
            message: "User created successfully",
            status: 200
        },{
            success: true
        });
    }catch(err){
        // console.log("error is : ", err);
        return NextResponse.json(
                {
                message: "failed to create user !!",
                status: false,
                },
                {
                status: 500,
                }
            );    
        }
}

// getting all users
export async function GET() {
    let allUsers = [];
    try{
        allUsers = await User.find();
        return NextResponse.json(allUsers,{
            message: "Users fetched seccessfully",
            success: true
        },{
            status: 200
        });
    }catch(err){
        console.log(err);
        return NextResponse.json({
            message: "Failed to get users",
            success: false
        },{
            success: false
        })
    }
}

