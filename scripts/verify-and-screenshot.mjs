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

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

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

const PORT = 4280;

server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const browser = await chromium.launch({
    executablePath: fs.existsSync(edgePath) ? edgePath : undefined,
  });

  const results = {
    viewports: [],
    addToast: {},
    visitsToast: {},
    sidebar: {},
    navigation: {},
  };

  try {
    const viewports = [
      { name: 'Mobile (375x812)', width: 375, height: 812, screenshot: 'screenshot-mobile-375x812.png' },
      { name: 'Mobile (430x932)', width: 430, height: 932, screenshot: 'screenshot-mobile-430x932.png' },
      { name: 'Tablet (768x1024)', width: 768, height: 1024, screenshot: 'screenshot-tablet-768x1024.png' },
      { name: 'Laptop (1366x768)', width: 1366, height: 768, screenshot: 'screenshot-laptop-1366x768.png' },
      { name: 'Desktop (1920x1080)', width: 1920, height: 1080, screenshot: 'screenshot-desktop-1920x1080.png' },
    ];

    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/home`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);

      // Verify dimensions, overflow, and bottom nav centering
      const vpMetrics = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const winWidth = window.innerWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const hasOverflow = scrollWidth > winWidth;

        // Tab bar metrics
        const tabBar = document.querySelector('.ops-tab-bar');
        const tabBarRect = tabBar ? tabBar.getBoundingClientRect() : null;

        // Fab button metrics
        const fabBtn = document.querySelector('.elevated-fab-btn');
        const fabRect = fabBtn ? fabBtn.getBoundingClientRect() : null;
        const fabCenterX = fabRect ? fabRect.left + fabRect.width / 2 : null;
        const viewportCenterX = winWidth / 2;
        const centerOffset = fabCenterX !== null ? Math.abs(fabCenterX - viewportCenterX) : null;
        const isFabCentered = centerOffset !== null && centerOffset <= 2.0;

        // Overview grid columns
        const grid = document.querySelector('.overview-cards-grid');
        const gridStyle = grid ? window.getComputedStyle(grid) : null;

        // Tasks list columns
        const tasksList = document.querySelector('.tasks-list');
        const tasksStyle = tasksList ? window.getComputedStyle(tasksList) : null;

        // Screen wrapper
        const wrapper = document.querySelector('.screen-wrapper');
        const wrapperRect = wrapper ? wrapper.getBoundingClientRect() : null;

        return {
          winWidth,
          docWidth,
          scrollWidth,
          hasOverflow,
          tabBarWidth: tabBarRect ? tabBarRect.width : null,
          tabBarSpansFullWidth: tabBarRect ? Math.abs(tabBarRect.width - winWidth) <= 1.0 : false,
          fabCenterX,
          viewportCenterX,
          centerOffset,
          isFabCentered,
          gridTemplateColumns: gridStyle ? gridStyle.gridTemplateColumns : null,
          tasksGridColumns: tasksStyle ? tasksStyle.gridTemplateColumns : null,
          wrapperWidth: wrapperRect ? wrapperRect.width : null,
        };
      });

      if (vp.screenshot) {
        const screenshotPath = path.join(artifactDir, vp.screenshot);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`Saved screenshot: ${screenshotPath}`);
      }

      results.viewports.push({
        name: vp.name,
        width: vp.width,
        height: vp.height,
        ...vpMetrics,
      });

      await context.close();
    }

    // Test Add button interaction & Toast on 375x812
    {
      const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/home`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      // Click Add button
      const fabBtn = page.locator('.elevated-fab-btn');
      await fabBtn.click();
      await page.waitForTimeout(600);

      const toastVisible = await page.evaluate(() => {
        const toast = document.querySelector('ion-toast');
        if (!toast) return false;
        const shadow = toast.shadowRoot || toast;
        const messageEl = shadow.querySelector('.toast-message') || toast;
        return {
          exists: true,
          text: messageEl.textContent.trim(),
        };
      });

      const toastScreenshotPath = path.join(artifactDir, 'screenshot-add-toast.png');
      await page.screenshot({ path: toastScreenshotPath });
      console.log(`Saved Add toast screenshot: ${toastScreenshotPath}`);

      results.addToast = {
        toastTriggered: !!toastVisible,
        message: toastVisible.text || '',
        messageMatches: toastVisible.text?.includes('Task creation will be available in the next development stage.') || false,
      };

      // Test Visits Tab click toast
      const visitsTab = page.locator('ion-tab-button[tab="visits"]');
      await visitsTab.click();
      await page.waitForTimeout(600);

      const visitsToast = await page.evaluate(() => {
        const toast = document.querySelector('ion-toast');
        if (!toast) return false;
        const shadow = toast.shadowRoot || toast;
        const messageEl = shadow.querySelector('.toast-message') || toast;
        return {
          exists: true,
          text: messageEl.textContent.trim(),
        };
      });

      results.visitsToast = {
        toastTriggered: !!visitsToast,
        message: visitsToast.text || '',
      };

      await context.close();
    }

    // Test Sidebar Drawer on 375x812
    {
      const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/home`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      // Click hamburger menu
      const menuBtn = page.locator('ion-menu-button');
      await menuBtn.click();
      await page.waitForTimeout(600);

      const menuVisible = await page.evaluate(() => {
        const menu = document.querySelector('ion-menu');
        return menu && menu.classList.contains('show-menu');
      });

      const sidebarScreenshotPath = path.join(artifactDir, 'screenshot-sidebar-drawer.png');
      await page.screenshot({ path: sidebarScreenshotPath });
      console.log(`Saved sidebar screenshot: ${sidebarScreenshotPath}`);

      // Click 'Tasks' in sidebar
      const tasksMenuItem = page.locator('.menu-nav-item:has-text("Tasks")');
      await tasksMenuItem.click();
      await page.waitForTimeout(600);

      const currentUrlAfterMenu = page.url();
      const menuClosedAfterNav = await page.evaluate(() => {
        const menu = document.querySelector('ion-menu');
        return menu && !menu.classList.contains('show-menu');
      });

      results.sidebar = {
        opensOnClick: !!menuVisible,
        navigatesToTasks: currentUrlAfterMenu.includes('/tasks'),
        closesAfterNavigation: !!menuClosedAfterNav,
      };

      // Test Bottom Navigation: /tasks -> /settings -> /home
      const settingsTab = page.locator('ion-tab-button[tab="settings"]');
      await settingsTab.click();
      await page.waitForTimeout(400);
      const urlAtSettings = page.url();

      const homeTab = page.locator('ion-tab-button[tab="home"]');
      await homeTab.click();
      await page.waitForTimeout(400);
      const urlAtHome = page.url();

      // Test Task Details click
      const firstTaskItem = page.locator('.task-list-item').first();
      await firstTaskItem.click();
      await page.waitForTimeout(400);
      const urlAtTaskDetail = page.url();

      // Test Back button
      const backBtn = page.locator('app-task-detail ion-back-button');
      await backBtn.click();
      await page.waitForTimeout(400);
      const urlAfterBack = page.url();

      results.navigation = {
        settingsTabNav: urlAtSettings.includes('/settings'),
        homeTabNav: urlAtHome.includes('/home'),
        taskDetailNav: urlAtTaskDetail.includes('/tasks/task-'),
        backNav: urlAfterBack.includes('/home') || urlAfterBack.includes('/tasks'),
      };

      await context.close();
    }

    console.log('--- TEST RESULTS ---');
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    await browser.close();
    server.close();
  }
});
