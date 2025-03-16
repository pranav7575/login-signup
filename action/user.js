"use server"
import connectDB from "@/lib/db";
import User from "@/models/user";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { signIn, signOut } from "@/auth";

const githublogin = async () => {
   await signIn("github", { redirectTo: "/" });
}

const Googlelogin = async () => {
   await signIn("google", { redirectTo: "/" });
}


const handlesignout = async () => {
    await signOut();
}

const login = async (formdata) => {
    const email = formdata.get("email");
    const password = formdata.get("password");
    if (!email || !password) {
        throw new Error("Please fill all the fields");
    }

    try {
        await signIn("credentials", { 
            redirect: false,
            callbackUrl: "/",
            email, 
            password 
        });
    } catch (error) {
        const somerror = error.toString();
        console.log(somerror);
    }

    redirect('/');
}

const register = async (formdata) => {
    const name = formdata.get("name");
    const email = formdata.get("email");
    const password = formdata.get("password");
    if (!name || !email || !password) {
        return new Error("Please fill all the fields");
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
    
        return new Error("User already exists");
    }

    const hashedPassword = await hash(password, 12);
    await User.create({ name, email, password: hashedPassword });
    console.log("User created successfully");
    alert("User created successfully");

    redirect('/login');
}

export { register, login, githublogin,Googlelogin,handlesignout };