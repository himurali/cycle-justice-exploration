
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check, Tag } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface StoryCardProps {
  image: string;
  headline: string;
  subhead: string;
  description: string;
  primaryButtonLabel?: string;
  primaryButtonAction?: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonAction?: () => void;
  slug?: string;
  author?: string;
  category?: string;
  tags?: string[];
  onTagClick?: (tag: string) => void;
}

const StoryCard = ({
  image,
  headline,
  subhead,
  description,
  primaryButtonLabel = "Read More",
  primaryButtonAction,
  secondaryButtonLabel,
  secondaryButtonAction,
  slug,
  author,
  category,
  tags = [],
  onTagClick
}: StoryCardProps) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = () => {
    const url = `${window.location.origin}/story/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      toast({
        title: "Link copied!",
        description: "The story link has been copied to your clipboard.",
        duration: 3000,
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  
  return (
    <Card className="flex flex-col overflow-hidden border border-gray-200 rounded-xl shadow-sm h-full">
      <div className="relative w-full h-60 bg-gray-200">
        <img 
          src={image} 
          alt={headline} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="flex-grow p-6">
        <h3 className="text-2xl font-semibold tracking-tight mb-2 font-baskerville">{headline}</h3>
        <h4 className="text-base text-justice-text/80 mb-2 font-baskerville">{subhead}</h4>
        {author && <p className="text-sm text-justice-text/70 mb-2">By {author}</p>}
        <p className="text-sm text-justice-text/70 leading-relaxed">{description}</p>
        
        {/* Tags section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200"
                onClick={() => onTagClick && onTagClick(tag)}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col items-start gap-3">
        {/* Primary button (Read Story) */}
        {primaryButtonLabel && (
          slug ? (
            <Link to={`/story/${slug}`} className="inline-block w-full">
              <Button 
                className="rounded-full bg-justice-dark hover:bg-black text-white text-sm gap-2 w-full"
              >
                {primaryButtonLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button 
              className="rounded-full bg-justice-dark hover:bg-black text-white text-sm gap-2 w-full"
              onClick={primaryButtonAction}
            >
              {primaryButtonLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )
        )}
        
        {/* Secondary tag and copy link button */}
        <div className="flex justify-between items-center w-full">
          {secondaryButtonLabel && (
            <span 
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {secondaryButtonLabel}
            </span>
          )}
          
          {slug && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-gray-900 ml-auto"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy Link
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
