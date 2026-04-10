export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  summary?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
}

export interface Resume {
  id: string;
  userId: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateResumeDTO {
  userId: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  templateId: string;
}

export interface UpdateResumeDTO {
  personalInfo?: PersonalInfo;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  templateId?: string;
}

export interface ResumeListItem {
  id: string;
  templateId: string;
  personalInfo: {
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}