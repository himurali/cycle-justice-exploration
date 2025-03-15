
import equityPapers from '../content/research/equity/index.json';
import infrastructurePapers from '../content/research/infrastructure/index.json';
import healthPapers from '../content/research/health/index.json';
import policyPapers from '../content/research/policy/index.json';
import climatePapers from '../content/research/climate/index.json';
import economicsPapers from '../content/research/economics/index.json';

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
  return equityPapers as ResearchPaper[];
}

export function getInfrastructureResearch(): ResearchPaper[] {
  return infrastructurePapers as ResearchPaper[];
}

export function getHealthResearch(): ResearchPaper[] {
  return healthPapers as ResearchPaper[];
}

export function getPolicyResearch(): ResearchPaper[] {
  return policyPapers as ResearchPaper[];
}

export function getClimateResearch(): ResearchPaper[] {
  return climatePapers as ResearchPaper[];
}

export function getEconomicsResearch(): ResearchPaper[] {
  return economicsPapers as ResearchPaper[];
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
