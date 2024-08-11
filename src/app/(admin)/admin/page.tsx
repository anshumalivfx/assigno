"use client";
import { signOut } from "next-auth/react";
import React from "react";

const page = () => {
  const handleSignout = async (e: any) => {
    await signOut().then(() => {
      window.location.href = "/";
    });
  };
  return (
    <div>
      <button onClick={handleSignout}>signout</button>
    </div>
  );
};

export default page;
