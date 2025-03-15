
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getClimateResearch } from "@/lib/research";
import ResearchCard from "@/components/ResearchCard";

const ResearchClimate = () => {
  const papers = getClimateResearch();

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header with gradient */}
      <div className="w-full py-12 mb-8 text-center rounded-lg bg-gradient-to-r from-gray-900 to-gray-500">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Climate</h1>
        <p className="text-lg text-gray-200">
          Research on cycling's role in climate mitigation and adaptation
        </p>
      </div>
      
      {/* Research Categories */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <Button asChild variant="outline">
          <Link to="/vision-docs">All Research</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/equity">Equity & Justice</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/infrastructure">Infrastructure</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/health">Health</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/policy">Policy</Link>
        </Button>
        <Button asChild variant="default">
          <Link to="/vision-docs/climate">Climate</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/economics">Economics</Link>
        </Button>
      </div>
      
      {/* Papers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {papers.map((paper) => (
          <ResearchCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default ResearchClimate;
