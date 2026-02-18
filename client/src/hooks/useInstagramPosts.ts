import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export interface InstagramPost {
  id: number;
  instagramId: string;
  caption: string | null;
  mediaType: string;
  mediaUrl: string;
  permalink: string | null;
  timestamp: Date | null;
  likeCount: number | null;
  commentCount: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export function useInstagramPosts(limit: number = 12) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from tRPC
  const { data, isLoading: isFetching, error: fetchError } = trpc.instagram.getPosts.useQuery({
    limit,
  });

  useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
    } else if (data) {
      setPosts(data.data || []);
      setError(data.error || null);
      setIsLoading(false);
    } else if (fetchError) {
      setError(fetchError.message);
      setIsLoading(false);
    }
  }, [data, isFetching, fetchError]);

  return {
    posts,
    isLoading,
    error,
  };
}

export function useInstagramSync() {
  const syncMutation = trpc.instagram.syncPosts.useMutation();

  const sync = async () => {
    try {
      const result = await syncMutation.mutateAsync();
      return result;
    } catch (error) {
      console.error("Error syncing Instagram posts:", error);
      throw error;
    }
  };

  return {
    sync,
    isLoading: syncMutation.isPending,
    error: syncMutation.error,
  };
}
