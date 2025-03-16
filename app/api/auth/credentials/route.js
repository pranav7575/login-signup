import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { compare } from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    await connectDB();
    const user = await User.findOne({ email }).select("+password +role");
    
    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error("Credentials auth error:", error);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}