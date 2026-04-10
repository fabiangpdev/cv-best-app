import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pdfRoutes from './routes/pdfRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/pdf', pdfRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ms-pdf' });
});

app.listen(PORT, () => {
  console.log(`ms-pdf service running on port ${PORT}`);
});

export default app;