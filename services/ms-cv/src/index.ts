import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './presentation/routes/resumeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/cv', resumeRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ms-cv' });
});

app.listen(PORT, () => {
  console.log(`ms-cv service running on port ${PORT}`);
});

export default app;