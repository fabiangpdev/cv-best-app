import OpenAI from 'openai';
import {
  AITextOptimizationRequest,
  AITextOptimizationResponse,
} from '@project/shared/types/ai';
import { OPTIMIZE_CONTENT_PROMPT } from '../prompts';

export class ContentOptimizerService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async optimize(
    request: AITextOptimizationRequest
  ): Promise<AITextOptimizationResponse> {
    const prompt = OPTIMIZE_CONTENT_PROMPT
      .replace('{{text}}', request.text)
      .replace('{{type}}', request.type)
      .replace(
        '{{#if targetRole}}Rol objetivo: {{targetRole}}{{/if}}',
        request.targetRole
          ? `Rol objetivo: ${request.targetRole}`
          : ''
      );

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional CV writer. Return ONLY valid JSON, no additional text.',
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
      original: request.text,
      optimized: parsed.optimized || request.text,
      suggestions: parsed.suggestions || [],
    };
  }
}