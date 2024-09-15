import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full flex flex-col min-h-screen bg-accent-600">
            <TopBar />
            <div className="flex-1 mt-[120px] mb-[120px] px-5">
                {children}
            </div>
            <BottomBar />
            <Toaster />
        </div>
    );
};

export default Layout;
