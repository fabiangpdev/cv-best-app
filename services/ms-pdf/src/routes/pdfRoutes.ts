import { Router, Request, Response } from 'express';
import { PDFGeneratorService } from '../generator/PDFGeneratorService';
import { DEFAULT_TEMPLATES, PDFGenerateRequest } from '@project/shared/types/pdf';

const router = Router();
const pdfGenerator = new PDFGeneratorService();

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const request: PDFGenerateRequest = req.body;
    const result = await pdfGenerator.generate(request);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${result.fileName}"`
    );
    
    res.send(Buffer.from(result.pdfBase64, 'base64'));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/templates', (req: Request, res: Response) => {
  res.json(DEFAULT_TEMPLATES);
});

export default router;