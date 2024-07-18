// app/(main)/feed/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchFeeds, likePost, unlikePost } from "@/services/feedServices";
import { getToken } from "@/services/authentication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, Bookmark, BookmarkCheck, MessageSquare, Ellipsis } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FeedPage: React.FC = () => {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await fetchFeeds(token!);
        console.log('Fetched data:', data);
        setFeeds(data);
      } catch (err) {
        setError("Error fetching feeds");
      }
    };
    fetchData();
  }, []);

  const toggleLike = (feedId: string) => {
    setFeeds(feeds.map(feed => {
      if (feed.feedId === feedId) {
        return {
          ...feed,
          isLiked: !feed.isLiked,
          likeCount: feed.isLiked ? feed.likeCount - 1 : feed.likeCount + 1
        };
      }
      return feed;
    }));
  };

  const toggleBookmark = (feedId: string) => {
    setFeeds(feeds.map(feed => {
      if (feed.feedId === feedId) {
        return {
          ...feed,
          isBookmarked: !feed.isBookmarked
        };
      }
      return feed;
    }));
  };

  return (
    <div className="flex flex-col gap-6 px-4">
      {error && <div className="text-red-500">{error}</div>}

      {feeds.length > 0 ? (
        feeds.map(feed => (
          <>
            <div key={feed.feedId} className="feed-item ">
              <div className="flex items-center mb-4">
                <Avatar>
                  <AvatarImage src={feed.user.profilePicture || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="ml-3">
                  <h3 className="font-bold">{feed.user.username}</h3>
                  <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(feed.createdAt))}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold">{feed.title}</h3>
              <p className="mb-4">{feed.content}</p>

              <Image
                src={feed.image || 'https://via.placeholder.com/500x300'}
                alt="Feed image"
                width={500}
                height={300}
                className="rounded-lg"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <button onClick={() => toggleLike(feed.feedId)} className="flex items-center">
                    {feed.isLiked ? <Heart className="text-red-500" /> : <Heart />}
                  </button>

                  <div className="flex items-center ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <MessageSquare />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Ajouter votre commentaire</DialogTitle>
                          <DialogDescription>
                            Ajouter Votre commentaire ici
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Textarea />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Publier le commentaire</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <span className="ml-2">{feed.comments ? feed.comments.length : 0}</span>
                  </div>

                  <button onClick={() => toggleBookmark(feed.feedId)} className="flex items-center ml-4">
                    {feed.isBookmarked ? <BookmarkCheck /> : <Bookmark />}
                  </button>

                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-500"><Ellipsis /></button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-2">
                      <button className="text-red-500">Signaler</button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Separator />


          </>
        ))
      ) : (
        <div>No feeds available</div>
      )}
    </div>
  );
};

export default FeedPage;
