import { expect, test } from '@playwright/test';
import { createUniqueUser, loginThroughUi, registerThroughUi } from '../helpers/auth.helper';
import { createReservationFromFirstSpectacle } from '../helpers/booking.helper';

test.describe('Parcours réservation', () => {
  test('réserve un spectacle et le retrouve dans Mes réservations', async ({ page }) => {
    const user = createUniqueUser();
    await registerThroughUi(page, user);
    await loginThroughUi(page, user);

    const reservation = await createReservationFromFirstSpectacle(page, 7);

    await page.goto('/reservations');
    const targetedReservation = page
      .getByTestId('reservation-item')
      .filter({ hasText: reservation.spectacleTitle })
      .filter({ hasText: `Places: ${reservation.nombrePlaces}` })
      .first();

    await expect(targetedReservation).toBeVisible();
    await expect(targetedReservation.getByTestId('reservation-title')).toContainText(
      reservation.spectacleTitle,
    );
  });
});
