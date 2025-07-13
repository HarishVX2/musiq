"use client";
import { signIn } from "next-auth/react";

export default function Register() {
  const handleClick = async () => {
    await signIn("google", { callbackUrl: "/home" });
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold">Register/login</h1>
      <button onClick={handleClick} className="border">
        Sign in with Google
      </button>
    </div>
  );
}
