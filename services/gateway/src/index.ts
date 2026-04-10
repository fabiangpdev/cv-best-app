import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const MS_CV_URL = process.env.MS_CV_URL || 'http://localhost:3002';
const MS_IA_URL = process.env.MS_IA_URL || 'http://localhost:3003';
const MS_PDF_URL = process.env.MS_PDF_URL || 'http://localhost:3004';

app.use('/api/cv', createProxyMiddleware({
  target: MS_CV_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/cv': '/api/cv' },
}));

app.use('/api/ai', createProxyMiddleware({
  target: MS_IA_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/ai': '/api/ai' },
}));

app.use('/api/pdf', createProxyMiddleware({
  target: MS_PDF_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/pdf': '/api/pdf' },
}));

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'gateway',
    microservices: {
      ms-cv: MS_CV_URL,
      ms-ia: MS_IA_URL,
      ms-pdf: MS_PDF_URL,
    }
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Gateway error:', err.message);
  res.status(500).json({ error: 'Internal gateway error' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Routing to: ms-cv -> ${MS_CV_URL}, ms-ia -> ${MS_IA_URL}, ms-pdf -> ${MS_PDF_URL}`);
});

export default app;