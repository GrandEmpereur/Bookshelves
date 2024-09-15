"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ProfilePage: React.FC = () => {
  return (
    <div>
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-4">
        <Avatar className="w-24 h-24 mb-2">
          <AvatarImage src={`https://picsum.photos/200/300?random`} alt="Profile Picture" />
          <AvatarFallback>LN</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">Leonardo</h2>
        <p className="text-gray-600">Tu as lu 32 livres</p>
        <div className="flex gap-2 mt-2">
          <Badge variant="default">Motivation</Badge>
          <Badge variant="default">Fiction</Badge>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="flex justify-around items-center py-4 bg-gray-50 rounded-lg mb-4 shadow-sm">
        <div className="text-center">
          <h3 className="text-sm text-gray-500">Amis</h3>
          <p className="text-secondary text-lg font-bold text-[#a13a2e]">360</p>
        </div>
        <Separator orientation="vertical" className="h-12 mx-2" />
        <div className="text-center">
          <h3 className="text-sm text-gray-500">Livres lus</h3>
          <p className="text-secondary text-lg font-bold text-[#a13a2e]">238</p>
        </div>
        <Separator orientation="vertical" className="h-12 mx-2" />
        <div className="text-center">
          <h3 className="text-sm text-gray-500">Club</h3>
          <p className="text-secondary text-lg font-bold text-[#a13a2e]">16</p>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="lists" className="w-full mb-4">
        <TabsList className="flex gap-x-3" >
          <TabsTrigger value="lists">Listes</TabsTrigger>
          <TabsTrigger value="friends">Amis</TabsTrigger>
          <TabsTrigger value="communities">Communautés</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="lists">
          <div className="grid grid-cols-3 gap-2 mt-4">
            {/* Book items with random images */}
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden rounded-md shadow-sm">
                <CardContent>
                  <img
                    src={`https://picsum.photos/200/300?random=${index + 1}`}
                    alt={`Book ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="friends">
          <p>Contenu pour les amis...</p>
        </TabsContent>

        <TabsContent value="communities">
          <p>Contenu pour les communautés...</p>
        </TabsContent>

        <TabsContent value="posts">
          <p>Contenu pour les posts...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
