"use client";

import NotesClient from "./Notes.client";
import { use } from "react";

interface FilteredNotesPageProps {
  params: Promise<{ tag?: string[] }>;
}

export default function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const resolvedParams = use(params); // теперь params распакованы
  const tag = resolvedParams.tag?.[0] || "all";

  return <NotesClient filterTag={tag} />;
}
