import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen mt-16">
            <TopBar />
            <div className="flex-1 flex flex-col h-full justify-center items-center mt-20 mb-32" >
                {children}
            </div>
            <BottomBar />
            <Toaster />
        </div>
    );
};

export default Layout;
