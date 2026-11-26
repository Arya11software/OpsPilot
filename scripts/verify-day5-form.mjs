import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const wwwDir = path.join(projectRoot, 'www');
const artifactDir = 'C:/Users/HP/.gemini/antigravity/brain/b438dc74-281e-4317-9e3d-1bcde4f1a303';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(wwwDir, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(wwwDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = 4284;

server.listen(PORT, async () => {
  console.log(`Day 5 test server running at http://localhost:${PORT}`);
  const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const browser = await chromium.launch({
    executablePath: fs.existsSync(edgePath) ? edgePath : undefined,
  });

  try {
    // 1. Mobile Form Viewport (375x812)
    const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.goto(`http://localhost:${PORT}/home`, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(400);

    // Click bottom navigation elevated center Add button (+)
    const addFabBtn = mobilePage.locator('.elevated-fab-btn');
    await addFabBtn.click();
    await mobilePage.waitForTimeout(600);
    console.log('Navigated to:', mobilePage.url());

    // Capture clean form screenshot
    const mobileFormPath = path.join(artifactDir, 'screenshot-task-create-mobile.png');
    await mobilePage.screenshot({ path: mobileFormPath });
    console.log('Saved:', mobileFormPath);

    // Trigger validation by clicking submit with empty required fields
    const submitBtn = mobilePage.locator('.submit-button');
    await submitBtn.click();
    await mobilePage.waitForTimeout(400);

    // Capture validation errors screenshot
    const validationErrorsPath = path.join(artifactDir, 'screenshot-task-create-validation.png');
    await mobilePage.screenshot({ path: validationErrorsPath });
    console.log('Saved:', validationErrorsPath);
    await mobileCtx.close();

    // 2. Desktop Form Viewport (1366x768)
    const desktopCtx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    const desktopPage = await desktopCtx.newPage();
    await desktopPage.goto(`http://localhost:${PORT}/tasks/new`, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(500);

    const desktopFormPath = path.join(artifactDir, 'screenshot-task-create-desktop.png');
    await desktopPage.screenshot({ path: desktopFormPath });
    console.log('Saved:', desktopFormPath);
    await desktopCtx.close();

    console.log('Day 5 form screenshots captured successfully!');
  } catch (err) {
    console.error('Error in Day 5 verification:', err);
  } finally {
    await browser.close();
    server.close();
  }
});
