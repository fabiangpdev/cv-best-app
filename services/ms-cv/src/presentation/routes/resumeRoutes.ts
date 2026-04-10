import { Router, Request, Response } from 'express';
import { PrismaResumeRepository } from '../../infrastructure/repositories/PrismaResumeRepository';
import { CreateResumeUseCase } from '../../application/usecases/CreateResume';
import { UpdateResumeUseCase } from '../../application/usecases/UpdateResume';
import { GetResumeUseCase } from '../../application/usecases/GetResume';
import { DeleteResumeUseCase } from '../../application/usecases/DeleteResume';

const router = Router();
const resumeRepository = new PrismaResumeRepository();

const createResumeUseCase = new CreateResumeUseCase(resumeRepository);
const updateResumeUseCase = new UpdateResumeUseCase(resumeRepository);
const getResumeUseCase = new GetResumeUseCase(resumeRepository);
const deleteResumeUseCase = new DeleteResumeUseCase(resumeRepository);

router.post('/', async (req: Request, res: Response) => {
  try {
    const resume = await createResumeUseCase.execute(req.body);
    res.status(201).json(resume);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const resume = await getResumeUseCase.execute(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const resumes = await getResumeUseCase.getByUserId(req.params.userId);
    res.json(resumes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const resume = await updateResumeUseCase.execute(req.params.id, req.body);
    res.json(resume);
  } catch (error: any) {
    if (error.message === 'Resume not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteResumeUseCase.execute(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === 'Resume not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

export default router;