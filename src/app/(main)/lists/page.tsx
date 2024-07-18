"use client";

import React, { useEffect, useState } from "react";
import { fetchLists, createList } from "@/services/listServices";
import { getToken, getCurrentUser } from "@/services/authServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, Bookmark, BookmarkCheck, MessageSquare, Ellipsis, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

const LibraryPage: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newListTitle, setNewListTitle] = useState<string>('');
  const [newListDescription, setNewListDescription] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await fetchLists();
        setLists(data.reverse());
      } catch (err) {
        setError("Error fetching lists");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateList = async () => {
    try {
      const newList = await createList(newListTitle, newListDescription);
      setLists([newList, ...lists]);
      setNewListTitle('');
      setNewListDescription('');
    } catch (err) {
      setError("Error creating list");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4">
      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <div>
          <Skeleton className="w-full h-10 mb-4 rounded" />
          <Skeleton className="w-full h-6 mb-2 rounded" />
          <Skeleton className="w-full h-40 mb-4 rounded" />
          <Skeleton className="w-full h-10 mb-4 rounded" />
        </div>
      ) : (
        lists.length > 0 ? (
          lists.map(list => (
            <div key={list.listId} className="list-item">
              <h3 className="text-lg font-semibold">{list.title}</h3>
              <p className="mb-4">{list.description}</p>
              <Separator />
            </div>
          ))
        ) : (
          <div>No lists available</div>
        )
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'secondary'} size={'icon'} className="fixed bottom-[125px] right-10 rounded-full ">
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle liste</DialogTitle>
            <DialogDescription>Remplissez les détails de votre nouvelle liste ci-dessous</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="newListTitle">Titre</Label>
              <Input id="newListTitle" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="newListDescription">Description</Label>
              <Textarea id="newListDescription" value={newListDescription} onChange={(e) => setNewListDescription(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateList}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryPage;
