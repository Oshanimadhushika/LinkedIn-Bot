import React from "react";
import { App as AntdApp } from "antd";
import "antd/dist/reset.css";

export default function DashLayout({ children }) {
  return (
    <div lang="en">
      <div className="w-full h-full">
        <div className="bg-transparent min-h-screen">
          <AntdApp>{children}</AntdApp>
        </div>
      </div>
    </div>
  );
}
