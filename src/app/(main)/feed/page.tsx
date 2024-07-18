"use client";

import React, { useEffect, useState } from "react";
import { fetchFeeds, createFeed } from "@/services/feedServices";
import { getToken, getCurrentUser } from "@/services/authServices";
import { likeFeed, unlikeFeed } from "@/services/likeServices";
import { fetchComments, createComment } from "@/services/commentServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, Bookmark, BookmarkCheck, MessageSquare, Ellipsis, Plus } from "lucide-react";
import { formatDistanceToNow, isValid } from "date-fns";
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
import { Skeleton } from "@/components/ui/skeleton";

const FeedPage: React.FC = () => {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [image, setImage] = useState<string>('https://via.placeholder.com/300');
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await fetchFeeds();
        console.log('Fetched data:', data);
        setFeeds(data.reverse());
      } catch (err) {
        setError("Error fetching feeds");
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Fetched user:', user);
        setCurrentUser(user);
      } catch (err) {
        setError("Error fetching user data");
      }
    };

    fetchData();
    fetchCurrentUser();
  }, []);

  const toggleLike = async (feedId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await unlikeFeed(feedId);
      } else {
        await likeFeed(feedId);
      }
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
    } catch (error) {
      console.error("Error toggling like:", error);
      setError("Error toggling like");
    }
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

  const handleCreatePost = async () => {
    try {
      if (!currentUser) throw new Error("User not found");
      const newPost = await createFeed(newPostTitle, newPostContent, currentUser.userId, image);
      setFeeds([newPost, ...feeds]);
      setNewPostTitle('');
      setNewPostContent('');
    } catch (err) {
      setError("Error creating post");
    }
  };

  const handleCreateComment = async () => {
    try {
      if (!currentUser || !selectedFeedId) throw new Error("User or Feed not found");
      const newComment = await createComment(selectedFeedId, newCommentContent);
      console.log('New comment:', newComment);
      setNewCommentContent('');
      setSelectedFeedId(null);  // Close the comment dialog

      // Update the comment count for the feed
      setFeeds(feeds.map(feed => {
        if (feed.feedId === selectedFeedId) {
          return {
            ...feed,
            comments: [...feed.comments, newComment]
          };
        }
        return feed;
      }));
    } catch (err) {
      setError("Error creating comment");
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
        feeds.length > 0 ? (
          feeds.map(feed => (
            <div key={feed.feedId} className="feed-item">
              <div className="flex items-center mb-4">
                <Avatar>
                  <AvatarImage src={feed.user?.profilePicture || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{feed.user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-bold">{feed.user?.username || "Unknown"}</h3>
                  <p className="text-sm text-gray-500">
                    {isValid(new Date(feed.createdAt)) ? formatDistanceToNow(new Date(feed.createdAt)) : "Date invalide"}
                  </p>
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
              <div className="flex justify-between items-center mt-4 mb-10">
                <div className="flex items-center">
                  <button onClick={() => toggleLike(feed.feedId, feed.isLiked)} className="flex items-center">
                    {feed.isLiked ? <Heart className="text-red-500" /> : <Heart />}
                  </button>
                  <div className="flex items-center ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button onClick={() => setSelectedFeedId(feed.feedId)}><MessageSquare /></button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Ajouter votre commentaire</DialogTitle>
                          <DialogDescription>Ajouter Votre commentaire ici</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Textarea value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} />
                        </div>
                        <DialogFooter>
                          <Button type="button" onClick={handleCreateComment}>Publier le commentaire</Button>
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
              <Separator />
            </div>
          ))
        ) : (
          <div>No feeds available</div>
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
            <DialogTitle>Créer une nouvelle publication</DialogTitle>
            <DialogDescription>Remplissez les détails de votre nouvelle publication ci-dessous</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="newPostTitle">Titre</Label>
              <Input id="newPostTitle" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="newPostContent">Contenu</Label>
              <Textarea id="newPostContent" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreatePost}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedPage;
