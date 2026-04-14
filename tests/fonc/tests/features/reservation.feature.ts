import { expect, Page } from '@playwright/test';
import { TestKey, withParam } from '../core/test-key';

export interface CreatedReservation {
  reservationId: number;
  nombrePlaces: number;
}

export class ReservationFeature {
  constructor(private readonly page: Page) {}

  async reserve(nombrePlaces: number): Promise<CreatedReservation> {
    await expect(this.page.getByTestId(TestKey.ReservationPlacesInput)).toBeVisible();
    await this.page.getByTestId(TestKey.ReservationPlacesInput).fill(String(nombrePlaces));
    await this.page.getByTestId(TestKey.ReservationSubmit).click();

    const successMessage = this.page.getByTestId(TestKey.ReservationSuccess);
    await expect(successMessage).toBeVisible();

    const successText = await successMessage.textContent();
    const reservationIdMatch = successText?.match(/#(\d+)/);
    if (!reservationIdMatch) {
      throw new Error('Unable to parse reservation id from success message.');
    }

    return {
      reservationId: Number(reservationIdMatch[1]),
      nombrePlaces,
    };
  }

  async expectReservationVisible(
    reservationId: number,
    spectacleTitle: string,
    nombrePlaces: number,
  ): Promise<void> {
    const reservationItem = this.page.getByTestId(withParam(TestKey.ReservationItem, 'id', reservationId));
    await expect(reservationItem).toBeVisible();
    await expect(reservationItem.getByTestId(TestKey.ReservationTitle)).toContainText(spectacleTitle);
    await expect(
      this.page.getByTestId(withParam(TestKey.ReservationPlaces, 'id', reservationId)),
    ).toContainText(String(nombrePlaces));
  }

  async cancelReservation(reservationId: number): Promise<void> {
    await this.page.getByTestId(withParam(TestKey.ReservationCancel, 'id', reservationId)).click();
  }

  async expectReservationNotVisible(reservationId: number): Promise<void> {
    await expect(
      this.page.getByTestId(withParam(TestKey.ReservationItem, 'id', reservationId)),
    ).toHaveCount(0);
  }
}
