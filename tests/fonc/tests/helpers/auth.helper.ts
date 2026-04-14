import { expect, Page } from '@playwright/test';

export interface TestUser {
  email: string;
  password: string;
  nom: string;
  prenom: string;
}

export function createUniqueUser(): TestUser {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 100_000)}`;
  return {
    email: `e2e.user.${uniqueSuffix}@example.test`,
    password: 'Password123!',
    nom: 'E2E',
    prenom: `User${uniqueSuffix}`,
  };
}

export async function registerThroughUi(page: Page, user: TestUser): Promise<void> {
  await page.goto('/register');
  await expect(page.getByTestId('register-submit')).toBeVisible();

  await page.getByTestId('register-nom').fill(user.nom);
  await page.getByTestId('register-prenom').fill(user.prenom);
  await page.getByTestId('register-email').fill(user.email);
  await page.getByTestId('register-password').fill(user.password);

  await Promise.all([
    page.waitForURL('**/login'),
    page.getByTestId('register-submit').click(),
  ]);
}

export async function loginThroughUi(page: Page, user: TestUser): Promise<void> {
  await page.goto('/login');
  await expect(page.getByTestId('login-submit')).toBeVisible();

  await page.getByTestId('login-email').fill(user.email);
  await page.getByTestId('login-password').fill(user.password);

  await Promise.all([
    page.waitForURL('**/spectacles'),
    page.getByTestId('login-submit').click(),
  ]);

  await expect(page.getByTestId('session-user-email')).toContainText(user.email);
}
