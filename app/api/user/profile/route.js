import connectDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req ,res) {

    try{
        const {userid} = await req.json();

        // console.log(userid);
        await connectDB();
        const user = await User.find({"_id": userid});
        if(!user){
            return NextResponse.json(
                {message: "User not found"},
                {status: 404}
            );
        }
        return NextResponse.json(user);
    }
    catch(error){
        console.error("Profile error:", error);
        return NextResponse.json(
            {message: "Profile failed"},
            {status: 500}
        );
    }
}

export async function PUT(req)
{
    try{
        const {userid, name, email, role} = await req.json();
        await connectDB();
        const user = await User.findOneAndUpdate({"_id":userid}, {name, email, role});
        if(!user){
            return NextResponse.json(
                {message: "User not found"},
                {status: 404}
            );
        }
        return NextResponse.json("Profile updated successfully");
    }
        catch(error){
            console.error("Profile error:", error);
            return NextResponse.json(
                {message: "Profile failed"},
                {status: 500}
            );
        }

}