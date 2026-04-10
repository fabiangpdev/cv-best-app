export interface AITextOptimizationRequest {
  text: string;
  type: 'experience' | 'education' | 'summary' | 'skills';
  targetRole?: string;
}

export interface AITextOptimizationResponse {
  original: string;
  optimized: string;
  suggestions: string[];
}

export interface AISkillsSuggestionRequest {
  experience: Array<{
    company: string;
    position: string;
    description: string;
  }>;
  currentSkills: string[];
  targetRole?: string;
}

export interface AISkillsSuggestionResponse {
  suggestedTechnicalSkills: string[];
  suggestedSoftSkills: string[];
  reasoning: string;
}

export interface AIJobMatchRequest {
  resume: {
    experience: Array<{
      company: string;
      position: string;
      description: string;
    }>;
    skills: string[];
    education: Array<{
      degree: string;
      field: string;
    }>;
  };
  jobDescription: string;
}

export interface AIJobMatchResponse {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export interface AIInterviewTipsRequest {
  targetRole: string;
  industry?: string;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
}

export interface AIInterviewTipsResponse {
  commonQuestions: Array<{
    question: string;
    suggestedAnswer: string;
    tips: string;
  }>;
  generalTips: string[];
  industrySpecificTips?: string[];
}