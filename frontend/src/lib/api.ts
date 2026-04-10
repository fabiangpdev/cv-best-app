export const API_BASE = import.meta.env.PUBLIC_API_BASE || 'http://localhost:3001';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  
  return response.json();
}

export const cvAPI = {
  list: (userId: string) => fetchAPI(`/api/cv/user/${userId}`),
  get: (id: string) => fetchAPI(`/api/cv/${id}`),
  create: (data: any) => fetchAPI('/api/cv', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchAPI(`/api/cv/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/api/cv/${id}`, { method: 'DELETE' }),
};

export const aiAPI = {
  optimize: (data: any) => fetchAPI('/api/ai/optimize', { method: 'POST', body: JSON.stringify(data) }),
  suggestSkills: (data: any) => fetchAPI('/api/ai/suggest-skills', { method: 'POST', body: JSON.stringify(data) }),
  matchJob: (data: any) => fetchAPI('/api/ai/match-job', { method: 'POST', body: JSON.stringify(data) }),
  interviewTips: (data: any) => fetchAPI('/api/ai/interview-tips', { method: 'POST', body: JSON.stringify(data) }),
};

export const pdfAPI = {
  generate: async (data: any) => {
    const response = await fetch(`${API_BASE}/api/pdf/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  },
  getTemplates: () => fetchAPI('/api/pdf/templates'),
};