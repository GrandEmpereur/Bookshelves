"use client";

import React from "react";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
    onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-[120px] right-6 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Add"
        >
            <Plus className="w-6 h-6" />
        </button>
    );
};

export default FloatingActionButton;
