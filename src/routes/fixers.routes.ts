import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar JSON
const fixers = JSON.parse(
  readFileSync(join(__dirname, '../../data/fixers.json'), 'utf-8')
);

const router = Router();

router.get('/api/fixers', (req, res) => {
  res.json(fixers);
});

export default router;
