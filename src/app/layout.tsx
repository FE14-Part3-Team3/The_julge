import React from "react";
import "./globals.css";
import Providers from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
              <Providers>{children}</Providers>
            </body>
        </html>
    );
}
