
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

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
  slug
}: StoryCardProps) => {
  console.log("Rendering StoryCard with slug:", slug);
  
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
        <h4 className="text-base text-justice-text/80 mb-4 font-baskerville">{subhead}</h4>
        <p className="text-sm text-justice-text/70 leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-3">
        {secondaryButtonLabel && (
          <Button 
            variant="outline" 
            className="rounded-full bg-gray-300 hover:bg-gray-400 border-none text-justice-text text-sm"
            onClick={secondaryButtonAction}
          >
            {secondaryButtonLabel}
          </Button>
        )}
        {primaryButtonLabel && (
          slug ? (
            <Link to={`/story/${slug}`} className="inline-block">
              <Button 
                className="rounded-full bg-justice-dark hover:bg-black text-white text-sm gap-2"
              >
                {primaryButtonLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button 
              className="rounded-full bg-justice-dark hover:bg-black text-white text-sm gap-2"
              onClick={primaryButtonAction}
            >
              {primaryButtonLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
