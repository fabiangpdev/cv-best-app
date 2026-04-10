import OpenAI from 'openai';
import {
  AIJobMatchRequest,
  AIJobMatchResponse,
} from '@project/shared/types/ai';

export class JobMatcherService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async match(request: AIJobMatchRequest): Promise<AIJobMatchResponse> {
    const prompt = `Eres un experto en reclutamiento y matching de perfiles laborales.

Compara el siguiente currículum con la descripción del puesto y calcula la compatibilidad.

CURRÍCULUM:
- Experiencia: ${request.resume.experience
      .map((e) => `${e.position} en ${e.company}`)
      .join(', ')}
- Skills: ${request.resume.skills.join(', ')}
- Educación: ${request.resume.education
      .map((e) => `${e.degree} en ${e.field}`)
      .join(', ')}

DESCRIPCIÓN DEL PUESTO:
"""
${request.jobDescription}
"""

Devuelve un JSON con:
{
  "matchScore": numero entre 0-100,
  "matchedSkills": ["skill presente en ambos"],
  "missingSkills": ["skill del puesto no presente en el CV"],
  "suggestions": ["sugerencia 1", "sugerencia 2"]
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a recruitment expert. Return ONLY valid JSON, no additional text.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(content);
    return {
      matchScore: parsed.matchScore || 0,
      matchedSkills: parsed.matchedSkills || [],
      missingSkills: parsed.missingSkills || [],
      suggestions: parsed.suggestions || [],
    };
  }
}