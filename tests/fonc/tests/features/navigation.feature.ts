import { expect, Page } from '@playwright/test';
import { TestKey } from '../core/test-key';

export class NavigationFeature {
  constructor(private readonly page: Page) {}

  async gotoSpectacles(): Promise<void> {
    await this.page.goto('/spectacles');
    await expect(this.page.getByTestId(TestKey.SpectaclesTitle)).toBeVisible();
  }

  async gotoReservations(): Promise<void> {
    await this.page.goto('/reservations');
    await expect(this.page.getByTestId(TestKey.ReservationsTitle)).toBeVisible();
  }

  async expectSessionEmail(email: string): Promise<void> {
    await expect(this.page.getByTestId(TestKey.SessionUserEmail)).toContainText(email);
  }
}
