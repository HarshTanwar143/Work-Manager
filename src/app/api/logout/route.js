import { NextResponse } from "next/server";


export async function POST(){
    const response = NextResponse.json({
        message: "user logout successfully",
        success: true
    });

    response.cookies.set("authToken", "",{
        expires: new Date(0)
    });

    return response;
}