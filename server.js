import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const { Pool } = pg;
const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Demo catalog fallback; replace with database-backed catalog in production.
const demoServices = [
  { id: 1, platform: 'Instagram', title: 'Instagram Content Promotion', description: 'Promote eligible public content to real audiences.', price_per_1000_paise: 24900 },
  { id: 2, platform: 'YouTube', title: 'YouTube Video Promotion', description: 'Campaign-based video discovery and promotion.', price_per_1000_paise: 39900 },
  { id: 3, platform: 'Facebook', title: 'Facebook Page Promotion', description: 'Promote your public page and content.', price_per_1000_paise: 29900 },
  { id: 4, platform: 'TikTok', title: 'TikTok Content Promotion', description: 'Promote eligible content where available.', price_per_1000_paise: 34900 },
  { id: 5, platform: 'WhatsApp', title: 'WhatsApp Channel Promotion', description: 'Promote a public channel through compliant campaigns.', price_per_1000_paise: 19900 }
];

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/services', async (_req, res) => {
  try {
    if (!pool) return res.json(demoServices);
    const result = await pool.query('SELECT id, platform, title, description, price_per_1000_paise FROM services WHERE active = TRUE ORDER BY platform, id');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Unable to load services.' });
  }
});

// Auth and user identity must be added before enabling order placement publicly.
app.post('/api/orders', async (req, res) => {
  const { serviceId, targetUrl, quantity } = req.body || {};
  if (!Number.isInteger(Number(serviceId)) || !Number.isInteger(Number(quantity)) || Number(quantity) < 1 ||
      typeof targetUrl !== 'string' || !/^https:\/\//i.test(targetUrl)) {
    return res.status(400).json({ error: 'Provide a valid service, HTTPS target URL, and positive quantity.' });
  }
  res.status(501).json({ error: 'Order processing is not enabled yet. Configure authentication, wallet ledger, and an authorized provider first.' });
});

// Never credit balances based on a frontend redirect. Verify gateway signatures and event IDs here.
app.post('/api/payments/webhook', async (_req, res) => {
  res.status(501).json({ error: 'Configure your payment gateway webhook signature verification before use.' });
});

app.get('/api/admin/summary', (_req, res) => {
  res.status(401).json({ error: 'Admin authentication is required.' });
});

app.listen(PORT, () => console.log(`Make Real Followers running at http://localhost:${PORT}`));
