import { User } from "@/models/user";
import { NextResponse } from "next/server";


// getting a user by id
export async function GET(request, {params}) {
    const {userId} =  params;

    try{
        const userFetched = await User.findById(userId);
        if(userFetched){
            return NextResponse.json(userFetched,{
                message: "User fetched successfully",
                success: true
            },{
                status: 200
            })
        }
        else{
            console.log("User not found");
            return NextResponse.json({
                message: "User not found",
                success: false
            },{
                status: 404
            });
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({
            success: false,
        },{
            status: 500
        });
    }
}

// updating a user by id
export async function PUT(request, {params}){
    const {userId} = params;
    const {name, password, about, profileUrl} = await request.json();
    try{
        const currentUser = await User.findById(userId);

        if(!currentUser){
            return NextResponse.json({
                message: "User not found",
                success: false
            },{
                status: 404
            });
        }
        if(name) currentUser.name = name;
        if(password) currentUser.password = password;
        if(about) currentUser.about = about;
        if(profileUrl) currentUser.profileUrl = profileUrl;

        const updatedUser = await currentUser.save();
        return NextResponse.json(updatedUser,{
            message: "User updated successfully",
            success: true
        },{
            status: 200
        });
    }catch(err){
        console.log(err);
        return NextResponse.json({
            message: "Failed to update user",
            success: false
        },{
            status: 500
        });
    }
}

// deleting a user by id
export async function DELETE(request, {params}){
    const {userId} = params;

    if(!userId || userId.length !== 24){
        return NextResponse.json({
            message: "Invalid user id",
            success: false
        },{
            status: 400
        });
    }

    try{
        const currentUser = await User.findById(userId);
        if(!currentUser){
            return NextResponse.json({
                message: "User not found",
                success: false
            },{
                status: 404
            });
        }
        await currentUser.deleteOne({_id: userId});
        console.log('User deleted successfully');

        return NextResponse.json({
            message: "User deleted successfully",
            success: true
        },{
            status:200
        })
    }catch(err){
        console.log(err);
        return NextResponse.json({
            message: "Failed to delete user",
            success: false
        },{
            status: 500
        });
    }
}