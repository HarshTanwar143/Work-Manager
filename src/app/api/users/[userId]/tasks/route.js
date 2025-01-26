import { Task } from "@/models/task";
import { NextResponse } from "next/server";


// getting all tasks of a user
export async function GET(request, {params}){
    const {userId} = params;
    if(!userId || userId.length !== 24){
        return NextResponse.json({
            message: "Invalid user id",
            success: false
        },{
            status: 400
        })
    }
    try{
        const allTasks = await Task.find({userId});
        if(allTasks.length === 0){
            return NextResponse.json({
                message: "No tasks found",
                success: true
            },{
                status: 200
            });
        }
        console.log("all tasks of user", allTasks);
        return NextResponse.json(allTasks);
    }catch(err){
        console.log(err);
        return NextResponse.json({
            message: "Failed to get tasks",
            success: false
        },{
            status: 500
        })
    }
}