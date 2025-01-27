import { User } from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function GET(request){
    try{
        const authToken = await request.cookies.get("authToken")?.value;
        const data = jwt.verify(authToken, process.env.JWT_SECRET);
        if(!data){
            return NextResponse.json({
                message: "Invalid token",
                success: false
            });;
        }
        const userId = data._id;
        const user = await User.findById(userId);
        console.log("user fetched successfully");
        return NextResponse.json({
            user: user,
            message: "user fetched!",
            success: true
        });
    }catch(err){
        return NextResponse.json({
            message: err.message,
            success: false
        });
    }
}