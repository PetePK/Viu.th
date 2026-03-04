'use client';

import { useState, useEffect, useCallback } from 'react';

interface UserInteractions {
  bookmarks: Set<string>;
  likes: Set<string>;
  toggleBookmark: (id: string) => void;
  toggleLike: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  isLiked: (id: string) => boolean;
}

const BOOKMARKS_KEY = 'viu-bookmarks';
const LIKES_KEY = 'viu-likes';

function loadSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function useUserInteractions(): UserInteractions {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [likes, setLikes] = useState<Set<string>>(new Set());

  // Hydrate from localStorage on mount
  useEffect(() => {
    setBookmarks(loadSet(BOOKMARKS_KEY));
    setLikes(loadSet(LIKES_KEY));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveSet(BOOKMARKS_KEY, next);
      return next;
    });
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveSet(LIKES_KEY, next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.has(id),
    [bookmarks]
  );

  const isLiked = useCallback((id: string) => likes.has(id), [likes]);

  return { bookmarks, likes, toggleBookmark, toggleLike, isBookmarked, isLiked };
}
