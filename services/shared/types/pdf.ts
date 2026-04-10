import { Resume } from '../types/resume';

export interface PDFGenerateRequest {
  resume: Resume;
  templateId: string;
}

export interface PDFGenerateResponse {
  pdfBase64: string;
  fileName: string;
}

export interface PDFTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  isPremium: boolean;
}

export const DEFAULT_TEMPLATES: PDFTemplate[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño limpio y contemporáneo con líneas divisorias',
    isPremium: false
  },
  {
    id: 'classic',
    name: 'Clásico',
    description: 'Diseño tradicional con formato conservador',
    isPremium: false
  },
  {
    id: 'creative',
    name: 'Creativo',
    description: 'Diseño único con acentos de color',
    isPremium: false
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Diseño simples sin elementos innecesarios',
    isPremium: false
  }
];