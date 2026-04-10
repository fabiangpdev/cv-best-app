import React, { useState } from 'react';
import { cvAPI, aiAPI, pdfAPI } from '../lib/api';
import type { ResumeFormData, Experience, Education } from '../types/resume';

const initialFormData: ResumeFormData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  templateId: 'modern',
};

export default function CVEditor() {
  const [formData, setFormData] = useState<ResumeFormData>(initialFormData);
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'ai'>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: crypto.randomUUID(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      }]
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    setFormData(prev => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: crypto.randomUUID(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }]
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setFormData(prev => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSkillsChange = (value: string) => {
    const skillsArray = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userId = 'demo-user';
      await cvAPI.create({ ...formData, userId });
      alert('CV guardado exitosamente!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await pdfAPI.generate({ resume: formData, templateId: formData.templateId });
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleAIOptimize = async () => {
    setIsLoadingAI(true);
    try {
      const result = await aiAPI.optimize({
        text: formData.personalInfo.summary || formData.experience[0]?.description || '',
        type: 'summary',
      });
      setAiResult(result);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSuggestSkills = async () => {
    setIsLoadingAI(true);
    try {
      const result = await aiAPI.suggestSkills({
        experience: formData.experience,
        currentSkills: formData.skills,
      });
      setAiResult(result);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Datos Personales' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'education', label: 'Educación' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'ai', label: 'IA' },
  ] as const;

  return (
    <div className="editor">
      <div className="sidebar">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="template-selector">
          <label>Plantilla:</label>
          <select
            value={formData.templateId}
            onChange={(e) => setFormData(prev => ({ ...prev, templateId: e.target.value }))}
          >
            <option value="modern">Moderno</option>
            <option value="classic">Clásico</option>
            <option value="minimal">Minimalista</option>
            <option value="creative">Creativo</option>
          </select>
        </div>

        <div className="actions">
          <button onClick={handleSave} disabled={isSaving} className="btn-primary">
            {isSaving ? 'Guardando...' : 'Guardar CV'}
          </button>
          <button onClick={handleGeneratePDF} disabled={isGeneratingPDF} className="btn-secondary">
            {isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
      </div>

      <div className="content">
        {activeTab === 'personal' && (
          <div className="form-section">
            <h2>Información Personal</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="juan@email.com"
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="form-group">
                <label>Ubicación</label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="Ciudad, País"
                />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/juanperez"
                />
              </div>
              <div className="form-group">
                <label>Portfolio</label>
                <input
                  type="url"
                  value={formData.personalInfo.portfolio}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  placeholder="juanperez.dev"
                />
              </div>
              <div className="form-group full-width">
                <label>Resumen profesional</label>
                <textarea
                  value={formData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                  placeholder="Describe tu perfil profesional..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="form-section">
            <h2>Experiencia Laboral</h2>
            {formData.experience.map((exp, index) => (
              <div key={exp.id} className="item-card">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Empresa</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Puesto</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha inicio</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha fin</label>
                    <input
                      type="month"
                      value={exp.endDate || ''}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                      />
                      Actualmente trabajando aquí
                    </label>
                  </div>
                  <div className="form-group full-width">
                    <label>Descripción</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={3}
                      placeholder="Describe tus responsabilidades y logros..."
                    />
                  </div>
                </div>
                <button onClick={() => removeExperience(index)} className="btn-remove">
                  Eliminar
                </button>
              </div>
            ))}
            <button onClick={addExperience} className="btn-add">
              + Agregar experiencia
            </button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="form-section">
            <h2>Educación</h2>
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="item-card">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Institución</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Grado</label>
                    <select
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Bachiller">Bachiller</option>
                      <option value="Técnico">Técnico</option>
                      <option value="Licenciatura">Licenciatura</option>
                      <option value="Maestría">Maestría</option>
                      <option value="Doctorado">Doctorado</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Campo de estudio</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(index, 'field', e.target.value)}
                      placeholder="Ingeniería, Administración..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha inicio</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha fin</label>
                    <input
                      type="month"
                      value={edu.endDate || ''}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                <button onClick={() => removeEducation(index)} className="btn-remove">
                  Eliminar
                </button>
              </div>
            ))}
            <button onClick={addEducation} className="btn-add">
              + Agregar educación
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="form-section">
            <h2>Habilidades</h2>
            <div className="form-group">
              <label>Ingresa tus habilidades separadas por coma</label>
              <textarea
                value={formData.skills.join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="JavaScript, React, Node.js, Python, SQL..."
                rows={5}
              />
            </div>
            <div className="skills-preview">
              {formData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="form-section">
            <h2>Asistente IA</h2>
            <div className="ai-actions">
              <button onClick={handleAIOptimize} disabled={isLoadingAI} className="btn-ai">
                {isLoadingAI ? 'Procesando...' : 'Optimizar contenido'}
              </button>
              <button onClick={handleSuggestSkills} disabled={isLoadingAI} className="btn-ai">
                Sugerir habilidades
              </button>
            </div>
            {aiResult && (
              <div className="ai-result">
                <pre>{JSON.stringify(aiResult, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .editor {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #e2e8f0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tabs {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tab {
          padding: 12px 16px;
          border: none;
          background: #f1f5f9;
          border-radius: 8px;
          text-align: left;
          font-weight: 500;
          transition: all 0.2s;
        }
        .tab.active {
          background: #2563eb;
          color: white;
        }
        .template-selector {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .template-selector select {
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }
        .btn-primary, .btn-secondary {
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          border: none;
        }
        .btn-primary {
          background: #2563eb;
          color: white;
        }
        .btn-secondary {
          background: #f1f5f9;
          color: #1e293b;
        }
        .content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }
        .form-section h2 {
          margin-bottom: 24px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group.full-width {
          grid-column: span 2;
        }
        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #475569;
        }
        .form-group input, .form-group select, .form-group textarea {
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: #2563eb;
        }
        .item-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        .btn-add {
          padding: 12px 20px;
          background: #f1f5f9;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          color: #2563eb;
        }
        .btn-remove {
          margin-top: 12px;
          padding: 8px 16px;
          background: #fee2e2;
          border: none;
          border-radius: 6px;
          color: #dc2626;
          font-size: 14px;
        }
        .skills-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }
        .skill-tag {
          background: #e2e8f0;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
        }
        .ai-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        .btn-ai {
          padding: 12px 24px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
        }
        .ai-result {
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
        }
        .ai-result pre {
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}