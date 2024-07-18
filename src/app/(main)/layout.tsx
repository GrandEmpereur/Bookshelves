import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full flex flex-col mt-10 px-12">
            <TopBar />
            <div className="w-full flex flex-col h-full mt-20 mb-32" >
                {children}
            </div>
            <BottomBar />
            <Toaster />
        </div>
    );
};

export default Layout;
