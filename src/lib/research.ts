
export type ResearchTag = 
  | 'accessibility'
  | 'active mobility'
  | 'air quality'
  | 'climate change'
  | 'cost-benefit'
  | 'e-bikes'
  | 'emissions'
  | 'energy efficiency'
  | 'environment'
  | 'equity'
  | 'health economics'
  | 'infrastructure'
  | 'lifecycle assessment'
  | 'mental health'
  | 'mobility justice'
  | 'public health'
  | 'social justice'
  | 'sustainable transportation'
  | 'systematic review'
  | 'transportation'
  | 'urban planning';

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  abstract: string;
  tags: ResearchTag[];
  url: string;
  category: 'equity' | 'infrastructure' | 'health' | 'policy' | 'climate' | 'economics';
}

export function getAllResearchPapers(): ResearchPaper[] {
  // Combine all research papers from different categories
  return [
    ...getEquityResearch(),
    ...getInfrastructureResearch(),
    ...getHealthResearch(),
    ...getPolicyResearch(),
    ...getClimateResearch(),
    ...getEconomicsResearch()
  ];
}

export function getEquityResearch(): ResearchPaper[] {
  // Load from JSON file
  const papers = require('../content/research/equity/index.json');
  return papers as ResearchPaper[];
}

export function getInfrastructureResearch(): ResearchPaper[] {
  // Load from JSON file
  const papers = require('../content/research/infrastructure/index.json');
  return papers as ResearchPaper[];
}

export function getHealthResearch(): ResearchPaper[] {
  // Load from JSON file
  const papers = require('../content/research/health/index.json');
  return papers as ResearchPaper[];
}

export function getPolicyResearch(): ResearchPaper[] {
  // Load from JSON file
  const papers = require('../content/research/policy/index.json');
  return papers as ResearchPaper[];
}

export function getClimateResearch(): ResearchPaper[] {
  // Load from JSON file
  const papers = require('../content/research/climate/index.json');
  return papers as ResearchPaper[];
}

export function getEconomicsResearch(): ResearchPaper[] {
  // Load from JSON file
  const papers = require('../content/research/economics/index.json');
  return papers as ResearchPaper[];
}

export function getResearchPapersByTag(tag: ResearchTag): ResearchPaper[] {
  return getAllResearchPapers().filter(paper => paper.tags.includes(tag));
}

export function getResearchPapersByCategory(category: string): ResearchPaper[] {
  if (!category || category === 'all') {
    return getAllResearchPapers();
  }
  return getAllResearchPapers().filter(paper => paper.category === category);
}

export function getUniqueResearchTags(): ResearchTag[] {
  const allTags = getAllResearchPapers().flatMap(paper => paper.tags);
  return [...new Set(allTags)] as ResearchTag[];
}

export function searchResearchPapers(query: string): ResearchPaper[] {
  const searchLower = query.toLowerCase();
  return getAllResearchPapers().filter(paper => 
    paper.title.toLowerCase().includes(searchLower) ||
    paper.abstract.toLowerCase().includes(searchLower) ||
    paper.authors.some(author => author.toLowerCase().includes(searchLower)) ||
    paper.journal.toLowerCase().includes(searchLower) ||
    paper.tags.some(tag => tag.toLowerCase().includes(searchLower))
  );
}
