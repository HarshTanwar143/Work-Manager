import { Task } from "@/models/task";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


// getting all tasks
export async function GET(request){
    let allTasks = [];
    try{
        allTasks = await Task.find();
        if(allTasks.length === 0){
            return NextResponse.json({
                message: "No tasks found",
                success: false
            },{
                status: 404
            });
        }
    }catch(err){
        return NextResponse.json({
            message: err.message,
            success: false
        },{
            status: 500
        });
    }

    console.log("task successfully fetched");
    return NextResponse.json({
        message: "Task successfully fetched",
        success: true,
        tasks: allTasks
    });
}

// creating a new task
export async function POST(request){
    const {taskName, content, status} = await request.json();
    const authToken = request.cookies.get("authToken")?.value;


    if(!authToken){
        return NextResponse.json({  
                message: "Unauthorized access",
                success: false
            },{
                status: 401
            }
        );
    }

    const data = jwt.verify(authToken, process.env.JWT_SECRET);
    // console.log("extracted data :: ", data);

    if(!data){
        return NextResponse.json({
            message: "Unauthorized access",
            success: false
        },{
            status: 401
        });
    }

    try{
        const task = new Task({
            taskName,
            content,
            status,
            userId: data._id,
        });

        const newTask = await task.save();
        return NextResponse.json(newTask, {status: 201});
    }catch(err){
        return NextResponse.json({
            message: err.message,
            success: false
        },{
            status: 500
        });
    }
}

