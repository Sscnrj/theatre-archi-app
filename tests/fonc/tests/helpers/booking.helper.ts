import { expect, Page } from '@playwright/test';

export interface ReservationDetails {
  spectacleTitle: string;
  nombrePlaces: number;
}

export async function createReservationFromFirstSpectacle(
  page: Page,
  nombrePlaces: number,
): Promise<ReservationDetails> {
  await page.goto('/spectacles');
  await expect(page.getByTestId('spectacle-card').first()).toBeVisible();

  const firstCard = page.getByTestId('spectacle-card').first();
  const spectacleTitle = (await firstCard.getByTestId('spectacle-title').textContent())?.trim();
  if (!spectacleTitle) {
    throw new Error('Impossible de lire le titre du premier spectacle.');
  }

  await Promise.all([
    page.waitForURL(/\/spectacles\/\d+$/),
    firstCard.getByTestId('spectacle-detail-link').click(),
  ]);

  await page.getByTestId('reservation-nombre-places').fill(String(nombrePlaces));
  await page.getByTestId('reservation-submit').click();
  await expect(page.getByTestId('reservation-success')).toBeVisible();

  return {
    spectacleTitle,
    nombrePlaces,
  };
}
