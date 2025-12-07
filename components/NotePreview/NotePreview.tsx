"use client";

import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
  onClose: () => void;
  fullPageLink?: string; // ссылка на полноэкранную страницу
}

export default function NotePreview({
  note,
  onClose,
  fullPageLink,
}: NotePreviewProps) {
  const router = useRouter();

  const handleEditFullPage = () => {
    if (!fullPageLink) return;
    onClose();
    router.push(fullPageLink);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <button className={css.backBtn} onClick={onClose}>
          Close
        </button>
      </div>
      <div className={css.item}>
        <span className={css.tag}>{note.tag}</span>
        {note.content && <p className={css.content}>{note.content}</p>}
        <span className={css.date}>
          {new Date(note.createdAt).toLocaleString()}
        </span>
      </div>
      <button className={css.backBtn} onClick={handleEditFullPage}>
        Edit full page
      </button>
    </div>
  );
}
