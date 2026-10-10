import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';

// Serve static assets with appropriate caching
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html',
}));

// Fallback to index.html for any SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
