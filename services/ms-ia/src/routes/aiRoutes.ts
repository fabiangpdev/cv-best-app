import { Router, Request, Response } from 'express';
import { ContentOptimizerService } from '../services/ContentOptimizerService';
import { SkillsSuggestionsService } from '../services/SkillsSuggestionsService';
import { JobMatcherService } from '../services/JobMatcherService';
import { InterviewTipsService } from '../services/InterviewTipsService';

const router = Router();

const openaiApiKey = process.env.OPENAI_API_KEY || '';

const contentOptimizer = new ContentOptimizerService(openaiApiKey);
const skillsSuggestions = new SkillsSuggestionsService(openaiApiKey);
const jobMatcher = new JobMatcherService(openaiApiKey);
const interviewTips = new InterviewTipsService(openaiApiKey);

router.post('/optimize', async (req: Request, res: Response) => {
  try {
    const result = await contentOptimizer.optimize(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/suggest-skills', async (req: Request, res: Response) => {
  try {
    const result = await skillsSuggestions.suggest(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/match-job', async (req: Request, res: Response) => {
  try {
    const result = await jobMatcher.match(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/interview-tips', async (req: Request, res: Response) => {
  try {
    const result = await interviewTips.getTips(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;