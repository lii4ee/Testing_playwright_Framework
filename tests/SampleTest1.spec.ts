import { test, expect } from '@playwright/test';
import { LoginPageFlow } from '../pages/LoginPageFlow';
import { HomePageFlow } from '../pages/HomePageFlow';
import { LogoutPageFlow } from '../pages/LogoutPageFlow';
import { DashboardPageFlow } from '../pages/DashboardPageFlow';

test('SampleTest1', async ({ page }) => {
  const loginpageflow = new LoginPageFlow(page);
  await loginpageflow.execute();
  const homepageflow = new HomePageFlow(page);
  await homepageflow.execute();
  const logoutpageflow = new LogoutPageFlow(page);
  await logoutpageflow.execute();
});
