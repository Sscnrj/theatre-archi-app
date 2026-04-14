import { expect, Page } from '@playwright/test';
import { TestKey } from '../core/test-key';

export interface SpectacleSelection {
  spectacleId: number;
  spectacleTitle: string;
}

export class SpectaclesFeature {
  constructor(private readonly page: Page) {}

  async openFirstSpectacleDetail(): Promise<SpectacleSelection> {
    await this.page.goto('/spectacles');
    const firstCard = this.page.getByTestId(TestKey.SpectacleCard).first();
    await expect(firstCard).toBeVisible();

    const spectacleTitle = (await firstCard.getByTestId(TestKey.SpectacleTitle).textContent())?.trim();
    if (!spectacleTitle) {
      throw new Error('Unable to read the title of the first spectacle card.');
    }

    await Promise.all([
      this.page.waitForURL(/\/spectacles\/\d+$/),
      firstCard.getByTestId(TestKey.SpectacleDetailLink).click(),
    ]);

    const spectacleIdMatch = this.page.url().match(/\/spectacles\/(\d+)$/);
    if (!spectacleIdMatch) {
      throw new Error('Unable to extract spectacleId from current URL.');
    }

    return {
      spectacleId: Number(spectacleIdMatch[1]),
      spectacleTitle,
    };
  }
}
