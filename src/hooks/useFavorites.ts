"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "prompthub:favorites";
const CHANGE_EVENT = "prompthub:favorites-changed";

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function subscribe(callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) callback();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function parseFavorites(value: string) {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favorites = parseFavorites(snapshot);

  function toggleFavorite(slug: string) {
    const nextFavorites = favorites.includes(slug)
      ? favorites.filter((favoriteSlug) => favoriteSlug !== slug)
      : [...favorites, slug];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return { favorites, toggleFavorite };
}
