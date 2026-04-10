import OpenAI from 'openai';
import {
  AIInterviewTipsRequest,
  AIInterviewTipsResponse,
} from '@project/shared/types/ai';

export class InterviewTipsService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async getTips(
    request: AIInterviewTipsRequest
  ): Promise<AIInterviewTipsResponse> {
    const prompt = `Eres un experto en preparación para entrevistas de trabajo.

Genera consejos y preguntas comunes para el siguiente perfil.

Rol: ${request.targetRole}
${request.industry ? `Industria: ${request.industry}` : ''}
Nivel de experiencia: ${request.experienceLevel}

Devuelve un JSON con:
{
  "commonQuestions": [
    {
      "question": "pregunta común",
      "suggestedAnswer": "respuesta sugerida",
      "tips": "consejo adicional"
    }
  ],
  "generalTips": ["consejo 1", "consejo 2"],
  "industrySpecificTips": ["consejo específico de industria"]
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a career coach. Return ONLY valid JSON, no additional text.',
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
      commonQuestions: parsed.commonQuestions || [],
      generalTips: parsed.generalTips || [],
      industrySpecificTips: parsed.industrySpecificTips || [],
    };
  }
}