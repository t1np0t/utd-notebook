"use client";

import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type FileType = {
  id: string;
  authorId: string;
  sectionId: string;
  fileTitle: string;
  fileName: string;
  publishDate: Date;
  likes: number;
  saves: number;
  createdAt: Date;
  editedAt: Date;
};

type Props = {
  onResults?: (files: FileType[]) => void;
};

export default function SearchBar({ onResults }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const res = await fetch(
        `/api/files/search?q=${encodeURIComponent(query)}`,
      );

      const raw = await res.text();
      console.log('RAW RESPONSE:', raw); // <--- IMPORTANT

      if (!raw) {
        console.error('API returned empty response');
        return;
      }

      const data = JSON.parse(raw) as FileType[];
      onResults?.(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <form
        onSubmit={(e) => {
            void handleSubmit(e);
        }}
      className="flex items-center gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md"
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search files"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
