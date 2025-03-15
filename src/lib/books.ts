
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
  region?: 'Asia' | 'Europe' | 'North America' | 'South America' | 'Africa' | 'Australia';
}

export function getEssentialBooks(): BookItem[] {
  return essentialBooks as BookItem[];
}

export function getAcademicBooks(): BookItem[] {
  return academicBooks as BookItem[];
}

export function getPracticalBooks(): BookItem[] {
  return practicalBooks as BookItem[];
}

export function getAllBooks(): BookItem[] {
  return [...getEssentialBooks(), ...getAcademicBooks(), ...getPracticalBooks()];
}

export function getBookById(id: string): BookItem | undefined {
  return getAllBooks().find(book => book.id === id);
}

export function getBooksByRegion(region?: string): BookItem[] {
  if (!region || region === 'All Continents') {
    return getAllBooks();
  }
  return getAllBooks().filter(book => book.region === region);
}
