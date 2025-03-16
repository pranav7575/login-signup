"use server";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";

const githublogin = async () => {
  await signIn("github", { redirectTo: "/" });
};

const Googlelogin = async () => {
  await signIn("google", { redirectTo: "/" });
};

const handlesignout = async () => {
  await signOut();
};

const login = async (formdata) => {
  const email = formdata.get("email");
  const password = formdata.get("password");
  
  try {
    await signIn("credentials", { 
      redirect: false,
      email, 
      password 
    });
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
  redirect('/');
};

const register = async (formdata) => {
  const name = formdata.get("name");
  const email = formdata.get("email");
  const password = formdata.get("password");

  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export { register, login, githublogin, Googlelogin, handlesignout };