"use client";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const SessionLayout = ({ children }: { children: React.ReactNode })=>{
    const { data: session } = useSession();
  
    return (
    <>
    {session?(
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar/>
              {/* Main Content */}
              <main className="flex-1 p-4 ml-64">{children}</main>
            </div>
          </div>
          ):(children)}
    </>
    );
  }
export default SessionLayout;