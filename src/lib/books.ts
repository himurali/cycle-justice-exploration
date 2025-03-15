
import essentialBooks from '../content/books/essential.json';
import academicBooks from '../content/books/academic.json';
import practicalBooks from '../content/books/practical.json';

export type BookReview = {
  author: string;
  text: string;
  rating: number;
};

export interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  category: 'essential' | 'academic' | 'practical';
  coverImage: string;
  publishYear: number;
  publisher?: string;
  pages?: number;
  tags?: string[];
  reviews?: BookReview[];
}

export function getEssentialBooks(): BookItem[] {
  return essentialBooks;
}

export function getAcademicBooks(): BookItem[] {
  return academicBooks;
}

export function getPracticalBooks(): BookItem[] {
  return practicalBooks;
}

export function getAllBooks(): BookItem[] {
  return [...essentialBooks, ...academicBooks, ...practicalBooks];
}

export function getBookById(id: string): BookItem | undefined {
  return getAllBooks().find(book => book.id === id);
}
