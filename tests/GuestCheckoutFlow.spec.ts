import { test, expect } from '@playwright/test';
import { HomePageFlow } from '../src/pages/HomePageFlow';
import { SignupPageFlow } from '../src/pages/SignupPageFlow';
import { LoginPageFlow } from '../src/pages/LoginPageFlow';
import { DashboardPageFlow } from '../src/pages/DashboardPageFlow';
import { CartPageFlow } from '../src/pages/CartPageFlow';
import { CheckoutPageFlow } from '../src/pages/CheckoutPageFlow';
import { ContactPageFlow } from '../src/pages/ContactPageFlow';
import { LogoutPageFlow } from '../src/pages/LogoutPageFlow';

test('GuestCheckoutFlow', async ({ page }) => {
  const homepageflow = new HomePageFlow(page);
  await homepageflow.execute();
  const dashboardpageflow = new DashboardPageFlow(page);
  await dashboardpageflow.execute();
  const cartpageflow = new CartPageFlow(page);
  await cartpageflow.execute();
  const checkoutpageflow = new CheckoutPageFlow(page);
  await checkoutpageflow.execute();
  const contactpageflow = new ContactPageFlow(page);
  await contactpageflow.execute();
});
