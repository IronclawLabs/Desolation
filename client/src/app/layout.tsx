import Footer from "../layouts/footer/Footer";
import NavbarMain from "../layouts/navbar/NavbarMain";
import { ContextProvider } from "../context/ContextProvider";
import { UIProvider } from "../context/UIProvider";

import ToastContextProvider from "../context/ToastProvider";
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import './globals.css';
import CoolLoading from "@/components/CoolLoading";
//asd
export const metadata = {
  title: "demo",
  description: "demo",
  images:"/logoimg.png"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/MV.png"  sizes="any" />

      </head>
      <body  className="mainaa">
        <UIProvider>
          <ContextProvider>
            <ToastContextProvider>
              <div className="w-full">
              
              <NavbarMain/>
              <Suspense fallback={<CoolLoading></CoolLoading>}>
              <div  style={{ minHeight:"70vh", maxWidth:"100vw" }}>{children}</div>

              </Suspense>

              <Footer />
              </div>
            </ToastContextProvider>
          </ContextProvider>
        </UIProvider>
      </body>
    </html>
  );
}
