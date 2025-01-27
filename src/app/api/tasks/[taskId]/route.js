import { Task } from "@/models/task";
import { NextResponse } from "next/server";


// getting a task by id
export async function GET(request, {params}){
    const {taskId} = params;

    try{
        const task = await Task.findById(taskId);
        if(!task){
            return NextResponse.json({
                message: "Task not found",
                success: false
            });
        }
        console.log('task successfully fetched');
        return NextResponse.json({
            message: "Task successfully fetched",
            success: true,
            task
        });
    }catch(err){
        return NextResponse.json({
            message: err.message,
            success: false
        },{
            status: 500
        });
    }
}

// updating a task by id
export async function PUT(request, {params}){
    const {taskId} = params;
    const {taskName, content, status} = await request.json();

    try{
        const currentTask = await Task.findById(taskId);
        if(!currentTask){
            return NextResponse.json({
                message: "Task not found",
                success: false
            },{
                status: 404
            });
        }
        
        if(taskName) currentTask.taskName = taskName;
        if(content) currentTask.content = content;
        if(status) currentTask.status = status;

        const updatedTask = await currentTask.save();
        return NextResponse.json({
            message: "Task updated successfully",
            success: true,
            task: updatedTask
        });
    }catch(err){
        return NextResponse.json({
            message: err.message,
            success: false
        },{
            status: 500
        });
    }
}

// deleting a task by id
export async function DELETE(request, {params}){
    const {taskId} = params;

    try{
        await Task.deleteOne({_id: taskId});
        console.log('task successfully deleted');
        return NextResponse.json({
            message: "Task successfully deleted",
            success: true
        });
    }catch(err){
        return NextResponse.json({
            message: err.message,
            success: false
        },{
            status: 500
        });
    }
}