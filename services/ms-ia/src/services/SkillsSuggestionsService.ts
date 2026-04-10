import OpenAI from 'openai';
import {
  AISkillsSuggestionRequest,
  AISkillsSuggestionResponse,
} from '@project/shared/types/ai';
import { SUGGEST_SKILLS_PROMPT } from '../prompts';

export class SkillsSuggestionsService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async suggest(
    request: AISkillsSuggestionRequest
  ): Promise<AISkillsSuggestionResponse> {
    const prompt = SUGGEST_SKILLS_PROMPT.replace(
      '{{#each experience}}',
      ''
    )
      .replace('{{/each}}', '')
      .replace(
        '{{#if targetRole}}',
        ''
      )
      .replace('{{/if}}', '');

    let formattedPrompt = `Eres un experto en análisis de perfiles profesionales. 

Analiza la siguiente experiencia laboral y skills actuales para sugerir habilidades relevantes.

Experiencia laboral:
${request.experience
  .map((e) => `- ${e.position} en ${e.company}: ${e.description}`)
  .join('\n')}

Skills actuales: ${request.currentSkills.join(', ')}
${request.targetRole ? `Rol objetivo: ${request.targetRole}` : ''}

Devuelve un JSON con:
{
  "suggestedTechnicalSkills": ["skill 1", "skill 2"],
  "suggestedSoftSkills": ["skill 1", "skill 2"],
  "reasoning": "explicación breve"
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a career advisor. Return ONLY valid JSON, no additional text.',
        },
        { role: 'user', content: formattedPrompt },
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
      suggestedTechnicalSkills: parsed.suggestedTechnicalSkills || [],
      suggestedSoftSkills: parsed.suggestedSoftSkills || [],
      reasoning: parsed.reasoning || '',
    };
  }
}