export const OPTIMIZE_CONTENT_PROMPT = `Eres un experto en currículums y redacción profesional. Tu tarea es optimizar el texto de un CV.

Analiza el siguiente texto y mejora:
1. Claridad y concisión
2. Gramática y ortografía
3. Uso de verbos de acción
4. Estructura con método STAR (Situación, Tarea, Acción, Resultado)
5. Tono profesional pero atractivo

Texto original:
"""
{{text}}
"""

Tipo de sección: {{type}}
{{#if targetRole}}Rol objetivo: {{targetRole}}{{/if}}

Devuelve un JSON con:
{
  "optimized": "texto mejorado",
  "suggestions": ["sugerencia 1", "sugerencia 2"]
}`;

export const SUGGEST_SKILLS_PROMPT = `Eres un experto en análisis de perfiles profesionales y tendencias del mercado laboral.

Analiza la siguiente experiencia laboral y skills actuales para sugerir habilidades relevantes.

Experiencia laboral:
{{#each experience}}
- {{position}} en {{company}}: {{description}}
{{/each}}

Skills actuales: {{currentSkills}}
{{#if targetRole}}Rol objetivo: {{targetRole}}{{/if}}

Devuelve un JSON con:
{
  "suggestedTechnicalSkills": ["skill 1", "skill 2"],
  "suggestedSoftSkills": ["skill 1", "skill 2"],
  "reasoning": "explicación de por qué estos skills son relevantes"
}`;

export const JOB_MATCH_PROMPT = `Eres un experto en reclutamiento y matching de perfiles laborales.

Compara el siguiente currículum con la descripción del puesto y calcula la compatibilidad.

CURRÍCULUM:
- Experiencia: {{#each resume.experience}}{{position}} en {{company}}{{/each}}
- Skills: {{resume.skills}}
- Educación: {{#each resume.education}}{{degree}} en {{field}}{{/each}}

DESCRIPCIÓN DEL PUESTO:
"""
{{jobDescription}}
"""

Devuelve un JSON con:
{
  "matchScore": numero entre 0-100,
  "matchedSkills": ["skill presente en ambos"],
  "missingSkills": ["skill del puesto no presente en el CV"],
  "suggestions": ["sugerencia 1", "sugerencia 2"]
}`;

export const INTERVIEW_TIPS_PROMPT = `Eres un experto en preparación para entrevistas de trabajo.

Genera consejos y preguntas comunes para el siguiente perfil.

Rol: {{targetRole}}
{{#if industry}}Industria: {{industry}}{{/if}}
Nivel de experiencia: {{experienceLevel}}

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