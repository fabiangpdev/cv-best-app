export interface TemplateData {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    portfolio?: string;
    summary?: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills: string[];
}

export const CV_TEMPLATES = {
  modern: `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px; }
    .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
    .name { font-size: 28px; font-weight: bold; color: #1e293b; margin-bottom: 5px; }
    .contact { font-size: 14px; color: #64748b; }
    .contact span { margin-right: 15px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 18px; font-weight: bold; color: #2563eb; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
    .summary { font-size: 14px; color: #475569; }
    .experience-item, .education-item { margin-bottom: 20px; }
    .job-title { font-size: 16px; font-weight: bold; color: #1e293b; }
    .company { font-size: 14px; color: #2563eb; }
    .date { font-size: 12px; color: #94a3b8; }
    .description { font-size: 13px; color: #475569; margin-top: 5px; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill { background: #e2e8f0; padding: 5px 12px; border-radius: 4px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">{{personalInfo.name}}</div>
      <div class="contact">
        <span>{{personalInfo.email}}</span>
        {{#if personalInfo.phone}}<span>{{personalInfo.phone}}</span>{{/if}}
        {{#if personalInfo.location}}<span>{{personalInfo.location}}</span>{{/if}}
        {{#if personalInfo.linkedin}}<span>{{personalInfo.linkedin}}</span>{{/if}}
      </div>
    </div>
    {{#if personalInfo.summary}}
    <div class="section">
      <div class="section-title">Perfil Profesional</div>
      <div class="summary">{{personalInfo.summary}}</div>
    </div>
    {{/if}}
    {{#if experience.length}}
    <div class="section">
      <div class="section-title">Experiencia Laboral</div>
      {{#each experience}}
      <div class="experience-item">
        <div class="job-title">{{position}}</div>
        <div class="company">{{company}} | <span class="date">{{startDate}} - {{#if current}}Actual{{else}}{{endDate}}{{/if}}</span></div>
        <div class="description">{{description}}</div>
      </div>
      {{/each}}
    </div>
    {{/if}}
    {{#if education.length}}
    <div class="section">
      <div class="section-title">Educación</div>
      {{#each education}}
      <div class="education-item">
        <div class="job-title">{{degree}} en {{field}}</div>
        <div class="company">{{institution}} | <span class="date">{{startDate}} - {{#if endDate}}{{endDate}}{{else}}Actual{{/if}}</span></div>
      </div>
      {{/each}}
    </div>
    {{/if}}
    {{#if skills.length}}
    <div class="section">
      <div class="section-title">Habilidades</div>
      <div class="skills-list">
        {{#each skills}}
        <span class="skill">{{this}}</span>
        {{/each}}
      </div>
    </div>
    {{/if}}
  </div>
</body>
</html>
`,

  classic: `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Times New Roman', serif; color: #000; line-height: 1.8; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px; }
    .header { text-align: center; border-bottom: 1px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
    .name { font-size: 24px; font-weight: bold; text-transform: uppercase; }
    .contact { font-size: 12px; margin-top: 8px; }
    .section { margin-bottom: 20px; }
    .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px; }
    .experience-item, .education-item { margin-bottom: 15px; }
    .job-title { font-weight: bold; }
    .company { font-style: italic; }
    .date { font-size: 11px; }
    .description { font-size: 12px; margin-top: 3px; }
    .skills-list { font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">{{personalInfo.name}}</div>
      <div class="contact">
        {{personalInfo.email}}{{#if personalInfo.phone}} | {{personalInfo.phone}}{{/if}}{{#if personalInfo.location}} | {{personalInfo.location}}{{/if}}
      </div>
    </div>
    {{#if personalInfo.summary}}
    <div class="section">
      <div class="section-title">Resumen Profesional</div>
      <div class="description">{{personalInfo.summary}}</div>
    </div>
    {{/if}}
    {{#if experience.length}}
    <div class="section">
      <div class="section-title">Experiencia Profesional</div>
      {{#each experience}}
      <div class="experience-item">
        <span class="job-title">{{position}}</span> - <span class="company">{{company}}</span>
        <div class="date">{{startDate}} - {{#if current}}Presente{{else}}{{endDate}}{{/if}}</div>
        <div class="description">{{description}}</div>
      </div>
      {{/each}}
    </div>
    {{/if}}
    {{#if education.length}}
    <div class="section">
      <div class="section-title">Educación</div>
      {{#each education}}
      <div class="education-item">
        <span class="job-title">{{degree}} en {{field}}</span> - {{institution}}
        <div class="date">{{startDate}}{{#if endDate}} - {{endDate}}{{/if}}</div>
      </div>
      {{/each}}
    </div>
    {{/if}}
    {{#if skills.length}}
    <div class="section">
      <div class="section-title">Habilidades</div>
      <div class="skills-list">{{skills.join(', ')}}</div>
    </div>
    {{/if}}
  </div>
</body>
</html>
`,

  minimal: `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Helvetica, Arial, sans-serif; color: #222; line-height: 1.5; }
    .container { max-width: 800px; margin: 0 auto; padding: 50px 40px; }
    .header { margin-bottom: 40px; }
    .name { font-size: 32px; font-weight: 300; letter-spacing: 2px; }
    .contact { font-size: 13px; color: #666; margin-top: 10px; }
    .section { margin-bottom: 35px; }
    .experience-item, .education-item { margin-bottom: 25px; padding-left: 20px; border-left: 2px solid #ddd; }
    .job-title { font-size: 16px; font-weight: 500; }
    .company { font-size: 14px; color: #666; }
    .date { font-size: 12px; color: #999; }
    .description { font-size: 14px; color: #444; margin-top: 8px; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 10px; font-size: 13px; }
    .skill { color: #666; }
    .skill:not(:last-child):after { content: "·"; margin-left: 10px; color: #ccc; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">{{personalInfo.name}}</div>
      <div class="contact">
        {{personalInfo.email}}{{#if personalInfo.phone}} · {{personalInfo.phone}}{{/if}}{{#if personalInfo.location}} · {{personalInfo.location}}{{/if}}
      </div>
    </div>
    {{#if personalInfo.summary}}
    <div class="section">
      <p>{{personalInfo.summary}}</p>
    </div>
    {{/if}}
    {{#if experience.length}}
    <div class="section">
      {{#each experience}}
      <div class="experience-item">
        <div class="job-title">{{position}}</div>
        <div class="company">{{company}} <span class="date">{{startDate}} — {{#if current}}Actual{{else}}{{endDate}}{{/if}}</span></div>
        <div class="description">{{description}}</div>
      </div>
      {{/each}}
    </div>
    {{/if}}
    {{#if education.length}}
    <div class="section">
      {{#each education}}
      <div class="education-item">
        <div class="job-title">{{degree}} {{field}}</div>
        <div class="company">{{institution}}</div>
      </div>
      {{/each}}
    </div>
    {{/if}}
    {{#if skills.length}}
    <div class="section">
      <div class="skills-list">
        {{#each skills}}<span class="skill">{{this}}</span>{{/each}}
      </div>
    </div>
    {{/if}}
  </div>
</body>
</html>
`,

  creative: `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; color: #333; }
    .container { max-width: 800px; margin: 0 auto; display: flex; }
    .sidebar { width: 220px; background: #1a1a2e; color: #fff; padding: 30px 20px; min-height: 1000px; }
    .main { flex: 1; padding: 30px; }
    .name { font-size: 24px; font-weight: bold; color: #fff; margin-bottom: 20px; }
    .sidebar-section { margin-bottom: 25px; }
    .sidebar-title { font-size: 12px; text-transform: uppercase; color: #e94560; margin-bottom: 10px; letter-spacing: 1px; }
    .sidebar-text { font-size: 12px; color: #ccc; line-height: 1.6; }
    .skill { font-size: 11px; background: #16213e; padding: 5px 10px; margin: 3px 0; border-radius: 3px; }
    .main-title { font-size: 20px; font-weight: bold; color: #1a1a2e; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e94560; }
    .experience-item { margin-bottom: 20px; }
    .job-title { font-size: 16px; font-weight: bold; color: #1a1a2e; }
    .company { font-size: 13px; color: #e94560; }
    .date { font-size: 11px; color: #666; }
    .description { font-size: 13px; color: #555; margin-top: 5px; }
    .education-item { margin-bottom: 15px; }
    .degree { font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="sidebar">
      <div class="name">{{personalInfo.name}}</div>
      <div class="sidebar-section">
        <div class="sidebar-title">Contacto</div>
        <div class="sidebar-text">{{personalInfo.email}}{{#if personalInfo.phone}}<br>{{personalInfo.phone}}{{/if}}{{#if personalInfo.location}}<br>{{personalInfo.location}}{{/if}}</div>
      </div>
      {{#if skills.length}}
      <div class="sidebar-section">
        <div class="sidebar-title">Habilidades</div>
        {{#each skills}}<div class="skill">{{this}}</div>{{/each}}
      </div>
      {{/if}}
    </div>
    <div class="main">
      {{#if personalInfo.summary}}
      <div class="main-title">Perfil</div>
      <p style="margin-bottom:25px;">{{personalInfo.summary}}</p>
      {{/if}}
      {{#if experience.length}}
      <div class="main-title">Experiencia</div>
      {{#each experience}}
      <div class="experience-item">
        <div class="job-title">{{position}}</div>
        <div class="company">{{company}} | <span class="date">{{startDate}} - {{#if current}}Actual{{else}}{{endDate}}{{/if}}</span></div>
        <div class="description">{{description}}</div>
      </div>
      {{/each}}
      {{/if}}
      {{#if education.length}}
      <div class="main-title">Educación</div>
      {{#each education}}
      <div class="education-item">
        <div class="degree">{{degree}} en {{field}}</div>
        <div class="company">{{institution}}</div>
      </div>
      {{/each}}
      {{/if}}
    </div>
  </div>
</body>
</html>
`
};