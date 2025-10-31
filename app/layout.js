import "./globals.css";
import React from "react";
import { ConfigProvider, App as AntdApp, theme as antdTheme } from "antd";
import "antd/dist/reset.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <ConfigProvider
          theme={{
            algorithm: antdTheme.defaultAlgorithm,
            token: {
              borderRadius: 10,
            },
          }}
        >
          <div className="bg-transparent min-h-screen">
            <AntdApp>{children}</AntdApp>
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
