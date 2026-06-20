"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export function FavoriteButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(slug);

  return (
    <button
      aria-label={isFavorite ? "取消收藏" : "收藏提示词"}
      aria-pressed={isFavorite}
      data-testid={`favorite-${slug}`}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
        isFavorite
          ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-emerald-500 hover:text-emerald-700"
      } ${compact ? "w-10 px-0" : "w-full"}`}
      onClick={() => toggleFavorite(slug)}
      title={isFavorite ? "取消收藏" : "收藏提示词"}
      type="button"
    >
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} aria-hidden="true" />
      {!compact && (isFavorite ? "已收藏" : "收藏")}
    </button>
  );
}
