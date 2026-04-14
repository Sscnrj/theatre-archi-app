import { expect, Page } from '@playwright/test';
import { TestKey } from '../core/test-key';
import type { TestUser } from '../support/test-user';

export class AuthFeature {
  constructor(private readonly page: Page) {}

  async assertProtectedRouteRedirect(fromRoute: string = '/reservations'): Promise<void> {
    await this.page.goto(fromRoute);
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.page.getByTestId(TestKey.LoginTitle)).toBeVisible();
  }

  async register(user: TestUser): Promise<void> {
    await this.page.goto('/register');
    await expect(this.page.getByTestId(TestKey.RegisterSubmit)).toBeVisible();

    await this.page.getByTestId(TestKey.RegisterNom).fill(user.nom);
    await this.page.getByTestId(TestKey.RegisterPrenom).fill(user.prenom);
    await this.page.getByTestId(TestKey.RegisterEmail).fill(user.email);
    await this.page.getByTestId(TestKey.RegisterPassword).fill(user.password);

    await Promise.all([
      this.page.waitForURL('**/login'),
      this.page.getByTestId(TestKey.RegisterSubmit).click(),
    ]);
  }

  async login(user: TestUser): Promise<void> {
    await this.page.goto('/login');
    await expect(this.page.getByTestId(TestKey.LoginSubmit)).toBeVisible();

    await this.page.getByTestId(TestKey.LoginEmail).fill(user.email);
    await this.page.getByTestId(TestKey.LoginPassword).fill(user.password);

    await Promise.all([
      this.page.waitForURL('**/spectacles'),
      this.page.getByTestId(TestKey.LoginSubmit).click(),
    ]);
  }
}
