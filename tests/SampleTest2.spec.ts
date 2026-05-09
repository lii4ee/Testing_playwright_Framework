import { test, expect } from '@playwright/test';
import { LoginPageFlow } from '../pages/LoginPageFlow';
import { HomePageFlow } from '../pages/HomePageFlow';
import { LogoutPageFlow } from '../pages/LogoutPageFlow';
import { DashboardPageFlow } from '../pages/DashboardPageFlow';

test('SampleTest2', async ({ page }) => {
  const loginpageflow = new LoginPageFlow(page);
  await loginpageflow.execute();
  const dashboardpageflow = new DashboardPageFlow(page);
  await dashboardpageflow.execute();
});
