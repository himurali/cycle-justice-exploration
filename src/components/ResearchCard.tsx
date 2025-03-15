
import React from "react";
import { ExternalLink } from "lucide-react";
import { ResearchPaper } from "@/lib/research";

interface ResearchCardProps {
  paper: ResearchPaper;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ paper }) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-2 mb-3">
        <h3 className="text-xl font-bold leading-tight">
          {paper.title}
        </h3>
        <a 
          href={paper.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="View full paper"
        >
          <ExternalLink size={18} />
        </a>
      </div>
      
      <div className="flex items-center gap-1 mb-2 text-sm text-gray-700">
        <span className="font-medium">{paper.authors.join(", ")}</span>
        <span className="text-gray-400 mx-1">•</span>
        <span>{paper.year}</span>
      </div>
      
      <p className="text-sm italic mb-3 text-gray-600">
        {paper.journal}
      </p>
      
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
        {paper.abstract}
      </p>
      
      <div className="flex flex-wrap gap-1.5">
        {paper.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResearchCard;
