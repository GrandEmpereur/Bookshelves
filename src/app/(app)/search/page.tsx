"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Feed from "@components/client/post/Feed";

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    return (
        <div className="flex flex-col gap-6 px-4">
            <div className="flex gap-4">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher des posts..."
                />
            </div>
            {loading ? (
                <div className="flex flex-col gap-6">
                    <Skeleton className="w-full h-10 mb-4 rounded" />
                    <Skeleton className="w-full h-6 mb-2 rounded" />
                    <Skeleton className="w-full h-40 mb-4 rounded" />
                    <Skeleton className="w-full h-10 mb-4 rounded" />
                </div>
            ) : (
                <div className="flex flex-col gap-y-6">
                </div>
            )}
        </div>
    );
};

export default SearchPage;
