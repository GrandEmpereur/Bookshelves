"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { User, Bookmark, ChartLine, Bell, HelpCircle, Shield, Trash, LogOut } from "lucide-react";

const SettingItem = ({
    title,
    icon: Icon,
}: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
}) => (
    <Button variant="ghost" className="flex items-center justify-between w-full px-5 py-7">
        <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
    </Button>
);

const SettingsPage: React.FC = () => {
    return (
        <div className="space-y-10">
            <Card className="shadow-md rounded-xl">
                <CardContent className="p-0 divide-y">
                    <SettingItem title="Profile" icon={User} />
                    <SettingItem title="Bookmarked" icon={Bookmark} />
                    <SettingItem title="Statistics" icon={ChartLine} />
                    <SettingItem title="Notifications" icon={Bell} />
                </CardContent>
            </Card>

            <Card className="shadow-md rounded-xl">
                <CardContent className="p-0 divide-y">
                    <SettingItem title="Get help" icon={HelpCircle} />
                    <SettingItem title="Privacy policy" icon={Shield} />
                    <SettingItem title="Delete account" icon={Trash} />
                    <SettingItem title="Log out" icon={LogOut} />
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;
