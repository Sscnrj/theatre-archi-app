import { expect, test } from '@playwright/test';
import { createUniqueUser, loginThroughUi, registerThroughUi } from '../helpers/auth.helper';
import { createReservationFromFirstSpectacle } from '../helpers/booking.helper';

test.describe('Parcours annulation', () => {
  test('annule une réservation existante', async ({ page }) => {
    const user = createUniqueUser();
    await registerThroughUi(page, user);
    await loginThroughUi(page, user);

    const reservation = await createReservationFromFirstSpectacle(page, 9);

    await page.goto('/reservations');
    const targetedReservation = page
      .getByTestId('reservation-item')
      .filter({ hasText: reservation.spectacleTitle })
      .filter({ hasText: `Places: ${reservation.nombrePlaces}` })
      .first();
    await expect(targetedReservation).toBeVisible();

    await targetedReservation.getByTestId('reservation-cancel').click();

    await expect(
      page
        .getByTestId('reservation-item')
        .filter({ hasText: reservation.spectacleTitle })
        .filter({ hasText: `Places: ${reservation.nombrePlaces}` }),
    ).toHaveCount(0);
  });
});
