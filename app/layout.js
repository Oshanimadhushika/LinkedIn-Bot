import "./globals.css";
import React from "react";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import "antd/dist/reset.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            algorithm: [theme.defaultAlgorithm, theme.darkAlgorithm],
            token: {
              colorPrimary: "#000000",
              colorTextLightSolid: "#ffffff",
              borderRadius: 10,
            },
          }}
        >
          <AntdApp>{children}</AntdApp>
        </ConfigProvider>
      </body>
    </html>
  );
}
