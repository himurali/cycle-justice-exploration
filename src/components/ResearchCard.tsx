
import React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ResearchPaper, ResearchTag } from "@/lib/research";

interface ResearchCardProps {
  paper: ResearchPaper;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ paper }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl font-bold leading-tight">
            {paper.title}
          </CardTitle>
          <a 
            href={paper.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-justice-blue hover:text-justice-blue-light transition-colors"
            aria-label="View full paper"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2 text-sm text-justice-text">
          <span className="font-medium">{paper.authors.join(", ")}</span>
          <span>•</span>
          <span>{paper.year}</span>
        </div>
        
        <p className="text-sm italic mb-3 text-justice-muted">
          {paper.journal}
        </p>
        
        <p className="text-sm text-justice-text line-clamp-4">
          {paper.abstract}
        </p>
      </CardContent>
      
      <CardFooter className="pt-1 pb-4 flex flex-wrap gap-1.5">
        {paper.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex text-xs px-2 py-1 rounded-full bg-justice-blue/10 text-justice-blue"
          >
            {tag}
          </span>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ResearchCard;
