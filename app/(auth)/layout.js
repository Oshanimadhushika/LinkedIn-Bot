import React from "react";
import "antd/dist/reset.css";

export default function AuthLayout({ children }) {
  return (
    <div lang="en">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "url('/bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-transparent min-h-screen">{children}</div>
      </div>
    </div>
  );
}
