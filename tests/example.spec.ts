import { test, expect } from '@playwright/test';
import { readTestData, writeResult } from '../utils/excelReader';
import path from 'path';

const DATA_FILE = path.resolve('test-data/testData.xlsx');
const testCases = await readTestData(DATA_FILE, 'Login');

for (const tc of testCases) {
  test(`${tc.testCaseId} - ${tc.description}`, async ({ page }) => {

    console.log(`Test case Description: ${tc.description}`);
    console.log(tc.testCaseId);

    await page.goto('/login');
    await page.getByLabel('Username').fill(tc.username);
    await page.getByLabel('Password').fill(tc.password);
    await page.getByRole('button', { name: 'Login' }).click();

    let status: 'PASS' | 'FAIL' = 'PASS';
    let actual = '';

    try {
      await expect(page).toHaveURL(/dashboard/);
      actual = 'Redirected to dashboard';
    } catch (e) {
      status = 'FAIL';
      actual = 'Login failed — URL mismatch';
      throw e; // let Playwright mark test as failed
    } finally {
      await writeResult(DATA_FILE, 'Login', tc.testCaseId, status, actual);
    }
  });
}