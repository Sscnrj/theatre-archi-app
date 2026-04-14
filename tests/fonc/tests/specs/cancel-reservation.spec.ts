import { BaseTest, test } from '../fixtures/base-test';
import type { AppFixtures } from '../fixtures/base-test';

type CancelScenarioFixtures = Pick<
  AppFixtures,
  'user' | 'authFeature' | 'navigationFeature' | 'spectaclesFeature' | 'reservationFeature'
>;

class CancelReservationTest extends BaseTest<CancelScenarioFixtures> {
  async reserveThenCancel(nombrePlaces: number): Promise<void> {
    this.annotate('Reservation', 'Cancel reservation');

    await this.fixtures.authFeature.register(this.fixtures.user);
    await this.fixtures.authFeature.login(this.fixtures.user);

    const spectacle = await this.fixtures.spectaclesFeature.openFirstSpectacleDetail();
    const reservation = await this.fixtures.reservationFeature.reserve(nombrePlaces);

    await this.fixtures.navigationFeature.gotoReservations();
    await this.fixtures.reservationFeature.expectReservationVisible(
      reservation.reservationId,
      spectacle.spectacleTitle,
      reservation.nombrePlaces,
    );

    await this.fixtures.reservationFeature.cancelReservation(reservation.reservationId);
    await this.fixtures.reservationFeature.expectReservationNotVisible(reservation.reservationId);
  }
}

test.describe('Parcours annulation', () => {
  test(
    'annule une reservation existante',
    { tag: ['@reservation', '@cancel'] },
    async (
      { user, authFeature, navigationFeature, spectaclesFeature, reservationFeature },
      testInfo,
    ) => {
      const scenario = new CancelReservationTest(
        { user, authFeature, navigationFeature, spectaclesFeature, reservationFeature },
        testInfo,
      );
      await scenario.reserveThenCancel(9);
    },
  );
});
