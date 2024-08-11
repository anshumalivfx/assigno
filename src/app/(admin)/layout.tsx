import AdminHeader from "@/components/headers/AdminHeader";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default layout;
