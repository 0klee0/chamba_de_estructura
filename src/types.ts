export interface Reference {
  id: number;
  authors: string;
  title: string;
  publication: string;
  year: number;
  edition?: string;
  pages?: string;
  doiOrUrl?: string;
  notes?: string;
}

export interface TeamMember {
  name: string;
  studentId: string;
  role?: string;
  contribution?: string;
}

export interface AlgorithmComplexity {
  name: string;
  recurrence: string;
  timeComplexity: string;
  spaceComplexity: string;
  spaceWithTCO?: string;
  method: string;
  details: string;
  simpleExplanation: string;
}
