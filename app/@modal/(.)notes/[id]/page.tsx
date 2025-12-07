"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

const NotePreviewPage = () => {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.id;
  const noteIdParam = Array.isArray(noteId) ? noteId[0] : noteId;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", noteIdParam],
    queryFn: () => fetchNoteById(noteIdParam!),
    enabled: !!noteIdParam,
  });

  if (!noteIdParam) return null;

  if (isLoading) return <Modal onClose={() => router.back()}>Loading...</Modal>;
  if (isError || !note)
    return <Modal onClose={() => router.back()}>Note not found</Modal>;

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview note={note} onClose={() => router.back()} />
    </Modal>
  );
};

export default NotePreviewPage;
