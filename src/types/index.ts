export type CategoryId = 
  | 'ai-ml' 
  | 'cloud-devops' 
  | 'cybersecurity' 
  | 'hardware-silicon' 
  | 'software-engineering';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  subtopics: string[];
  accentColor: string;
}

export interface ArticleMetric {
  label: string;
  value: string;
  baseline?: string;
  delta?: string;
}

export interface ArticleSection {
  title: string;
  paragraphs: string[];
  technicalBreakdown?: {
    headline: string;
    details: string;
    steps?: string[];
  };
  diagram?: {
    title: string;
    ascii: string;
  };
  callout?: {
    type: 'insight' | 'warning' | 'invariant';
    title: string;
    text: string;
  };
}

export interface Author {
  id: string;
  name: string;
  role: string;
  institution: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  categoryId: CategoryId;
  categoryName: string;
  subtopic: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  peerReviewed: boolean;
  doi: string;
  heroImage: string;
  heroPrompt: string; // The explicit AI visual generation prompt description requested
  visualConcept: string;
  abstract: string;
  metrics: ArticleMetric[];
  keyFeatures: string[]; // Bullet points in English describing core technical advantages on top of the visual
  sections: ArticleSection[];
  references: string[];
  featured?: boolean;
  trending?: boolean;
  rating?: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'article'; articleId: string }
  | { type: 'category'; categoryId: CategoryId }
  | { type: 'about' }
  | { type: 'editors' }
  | { type: 'contact' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'disclaimer' };
