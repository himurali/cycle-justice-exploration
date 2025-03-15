
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { BookItem } from '@/lib/books';

interface BookCardProps {
  book: BookItem;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="mb-2 h-40 bg-gray-100 rounded overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="font-baskerville text-lg">{book.title}</CardTitle>
        <CardDescription>
          <span className="font-medium">{book.author}</span> • {book.publishYear}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="text-sm text-justice-text/80 mb-3 line-clamp-3">{book.description}</p>
        
        {/* Compact Reviews Section - Just Stars */}
        {book.reviews && book.reviews.length > 0 && (
          <div className="mb-2">
            {book.reviews.map((review, idx) => (
              <div key={idx} className="flex items-center text-xs mb-1">
                <span className="mr-2 text-xs font-medium">{review.author}:</span>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mt-1">
          {book.tags?.map(tag => (
            <span key={tag} className="text-xs bg-justice-blue/10 text-justice-blue px-1.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-2 px-6 text-xs text-justice-text/60">
        {book.publisher} • {book.pages} pages
      </CardFooter>
    </Card>
  );
};

export default BookCard;
