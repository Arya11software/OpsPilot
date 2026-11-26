import { expect, test } from '@playwright/test';
import * as path from 'path';

const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\b438dc74-281e-4317-9e3d-1bcde4f1a303';

test.describe('Bottom Navigation Central FAB (+) Button Navigation', () => {
  test('Mobile (375x812): navigates from /home to /tasks/new and back to /home', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/home');
    await page.waitForLoadState('domcontentloaded');

    // Verify we are on /home
    await expect(page).toHaveURL(/.*home/);

    // Locate the central elevated FAB button
    const fabButton = page.locator('.elevated-fab-btn');
    await expect(fabButton).toBeVisible();
    await expect(fabButton).toBeEnabled();

    // Verify it is an Ionic button
    const tagName = await fabButton.evaluate((el) => el.tagName.toLowerCase());
    expect(['ion-button', 'button']).toContain(tagName);

    // Click central + button
    await fabButton.click();

    // Verify navigation to /tasks/new
    await expect(page).toHaveURL(/.*tasks\/new/);

    // Verify TaskCreatePage form renders properly
    const title = page.locator('app-task-create ion-title');
    await expect(title).toContainText('Create Field Task');

    await expect(page.locator('#task-title-input')).toBeVisible();
    await expect(page.locator('#task-category-select')).toBeVisible();
    await expect(page.locator('#task-location-input')).toBeVisible();
    await expect(page.locator('#task-date-input')).toBeVisible();
    await expect(page.locator('#task-time-input')).toBeVisible();
    await expect(page.locator('#task-description-textarea')).toBeVisible();
    await expect(page.locator('#task-priority-select')).toBeVisible();

    // Capture screenshot proof of navigated form on mobile
    await page.screenshot({
      path: path.join(artifactDir, 'screenshot-fab-mobile-verify.png'),
    });

    // Click back button and verify return to /home
    const backButton = page.locator('app-task-create ion-back-button');
    await expect(backButton).toBeVisible();
    await backButton.click();

    await expect(page).toHaveURL(/.*home/);
  });

  test('Mobile (375x812): navigates from /tasks to /tasks/new and back to /tasks', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/tasks');
    await page.waitForLoadState('domcontentloaded');

    // Verify we are on /tasks
    await expect(page).toHaveURL(/.*tasks$/);

    // Click central + button
    const fabButton = page.locator('.elevated-fab-btn');
    await expect(fabButton).toBeVisible();
    await fabButton.click();

    // Verify navigation to /tasks/new
    await expect(page).toHaveURL(/.*tasks\/new/);

    // Verify TaskCreatePage form renders
    await expect(page.locator('app-task-create ion-title')).toContainText('Create Field Task');

    // Click back button and verify return to /tasks
    const backButton = page.locator('app-task-create ion-back-button');
    await expect(backButton).toBeVisible();
    await backButton.click();

    await expect(page).toHaveURL(/.*tasks$/);
  });

  test('Tablet (768x1024): navigates from /home to /tasks/new and back', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/home');
    await page.waitForLoadState('domcontentloaded');

    const fabButton = page.locator('.elevated-fab-btn');
    await expect(fabButton).toBeVisible();
    await fabButton.click();

    await expect(page).toHaveURL(/.*tasks\/new/);
    await expect(page.locator('app-task-create ion-title')).toContainText('Create Field Task');

    const backButton = page.locator('app-task-create ion-back-button');
    await expect(backButton).toBeVisible();
    await backButton.click();

    await expect(page).toHaveURL(/.*home/);
  });

  test('Desktop (1366x768): navigates from /home to /tasks/new and back', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/home');
    await page.waitForLoadState('domcontentloaded');

    const fabButton = page.locator('.elevated-fab-btn');
    await expect(fabButton).toBeVisible();
    await fabButton.click();

    await expect(page).toHaveURL(/.*tasks\/new/);
    await expect(page.locator('app-task-create ion-title')).toContainText('Create Field Task');

    // Capture screenshot proof of navigated form on desktop
    await page.screenshot({
      path: path.join(artifactDir, 'screenshot-fab-desktop-verify.png'),
    });

    const backButton = page.locator('app-task-create ion-back-button');
    await expect(backButton).toBeVisible();
    await backButton.click();

    await expect(page).toHaveURL(/.*home/);
  });
});
