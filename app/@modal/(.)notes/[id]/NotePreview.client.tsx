'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';

const NotePreviewClient = () => {
  const router = useRouter();
  const closeModal = () => router.back();
  const { id } = useParams<{ id: string }>();
  const parseId = Number(id);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', parseId],
    queryFn: () => fetchNoteById(parseId),
    refetchOnMount: false,
  });
  if (isLoading)
    return (
      <div className={css.backdrop}>
        <Loader />
      </div>
    );
  if (error) return <p>Something went wrong.</p>;
  if (!note) return <p>Sorry, note not found.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;
  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.backBtn} onClick={closeModal}>
              Back
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
