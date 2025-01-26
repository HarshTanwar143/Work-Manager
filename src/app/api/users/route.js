import { User } from "@/models/user";
import { dbConnect } from "@/helper/dbConnect";
import { NextResponse } from "next/server";

dbConnect();

// creating a new user
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
        const createdUser = await user.save();
        return NextResponse.json(user,{
            message: "User created successfully",
            status: 200
        },{
            success: true
        });
    }catch(err){
        return generateResponse("Failed to create user", 500, false);
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

