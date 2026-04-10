import puppeteer, { Browser } from 'puppeteer';
import Handlebars from 'handlebars';
import { TemplateData } from '../templates/cvTemplates';
import { CV_TEMPLATES } from '../templates/cvTemplates';
import { PDFGenerateRequest, PDFGenerateResponse } from '../../../shared/types/pdf';

export class PDFGeneratorService {
  private browser: Browser | null = null;

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
  }

  async generate(request: PDFGenerateRequest): Promise<PDFGenerateResponse> {
    if (!this.browser) {
      await this.initialize();
    }

    const templateHtml = CV_TEMPLATES[request.templateId as keyof typeof CV_TEMPLATES];
    if (!templateHtml) {
      throw new Error(`Template ${request.templateId} not found`);
    }

    const template = Handlebars.compile(templateHtml);
    const html = template(request.resume as unknown as TemplateData);

    const page = await this.browser!.createPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    await page.close();

    const fileName = `${request.resume.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;

    return {
      pdfBase64: pdf.toString('base64'),
      fileName,
    };
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}