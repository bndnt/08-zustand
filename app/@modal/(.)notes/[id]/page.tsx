// app/@modal/(.)notes/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

const NotePreviewRoute = () => {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId!),
    enabled: !!noteId,
  });

  if (!noteId) return null;
  if (isLoading) return <Modal onClose={() => router.back()}>Loading...</Modal>;
  if (isError || !note)
    return <Modal onClose={() => router.back()}>Note not found</Modal>;

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview
        note={note}
        onClose={() => router.back()}
        fullPageLink={`/notes/${note.id}`} // ссылка на full page
      />
    </Modal>
  );
};

export default NotePreviewRoute;
