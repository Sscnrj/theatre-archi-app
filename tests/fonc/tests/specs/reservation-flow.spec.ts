import { BaseTest, test } from '../fixtures/base-test';
import type { AppFixtures } from '../fixtures/base-test';

type ReservationScenarioFixtures = Pick<
  AppFixtures,
  'user' | 'authFeature' | 'navigationFeature' | 'spectaclesFeature' | 'reservationFeature'
>;

class ReservationFlowTest extends BaseTest<ReservationScenarioFixtures> {
  async reserveAndFindIt(nombrePlaces: number): Promise<void> {
    this.annotate('Reservation', 'Reserve and list');

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
  }
}

test.describe('Parcours reservation', () => {
  test(
    'reserve un spectacle et le retrouve dans Mes reservations',
    { tag: ['@reservation', '@smoke'] },
    async (
      { user, authFeature, navigationFeature, spectaclesFeature, reservationFeature },
      testInfo,
    ) => {
      const scenario = new ReservationFlowTest(
        { user, authFeature, navigationFeature, spectaclesFeature, reservationFeature },
        testInfo,
      );
      await scenario.reserveAndFindIt(7);
    },
  );
});
