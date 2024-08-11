"use client";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="w-full bg-zinc-100 h-[50px]">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto px-4">
        <div>
          <h1 className="text-lg font-bold text-black">Create Next App</h1>
        </div>
        <div>
          <Button
            onClick={() => {
              window.location.href = "/admin";
            }}
          >
            Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
