
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResearchPapersList from '@/components/ResearchPapersList';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getAllResearchPapers } from '@/lib/research';

export default function ResearchPapersPage() {
  const papers = getAllResearchPapers();
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <ResearchPapersList papers={papers} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
