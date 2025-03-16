import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { provider, profile, providerAccountId } = await req.json();
    await connectDB();

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        name: profile.name || "Anonymous",
        email: profile.email,
        image: profile.image || profile.picture,
        authproviderId: providerAccountId,
        role: "user",
      });
    }

    return NextResponse.json({
      id: user._id.toString(),
      role: user.role
    });

  } catch (error) {
    console.error("OAuth auth error:", error);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}