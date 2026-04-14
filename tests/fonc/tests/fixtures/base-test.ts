import { expect, test as base, type TestInfo } from '@playwright/test';
import { AuthFeature } from '../features/auth.feature';
import { NavigationFeature } from '../features/navigation.feature';
import { ReservationFeature } from '../features/reservation.feature';
import { SpectaclesFeature } from '../features/spectacles.feature';
import { createUniqueUser, type TestUser } from '../support/test-user';

export interface AppFixtures {
  user: TestUser;
  authFeature: AuthFeature;
  navigationFeature: NavigationFeature;
  reservationFeature: ReservationFeature;
  spectaclesFeature: SpectaclesFeature;
}

export const test = base.extend<AppFixtures>({
  user: async ({}, use) => {
    await use(createUniqueUser());
  },
  authFeature: async ({ page }, use) => {
    await use(new AuthFeature(page));
  },
  navigationFeature: async ({ page }, use) => {
    await use(new NavigationFeature(page));
  },
  reservationFeature: async ({ page }, use) => {
    await use(new ReservationFeature(page));
  },
  spectaclesFeature: async ({ page }, use) => {
    await use(new SpectaclesFeature(page));
  },
});

export { expect };

export abstract class BaseTest<TFixtures> {
  protected constructor(
    protected readonly fixtures: TFixtures,
    protected readonly testInfo: TestInfo,
  ) {}

  protected annotate(feature: string, story: string): void {
    this.testInfo.annotations.push({
      type: 'feature',
      description: feature,
    });
    this.testInfo.annotations.push({
      type: 'story',
      description: story,
    });
  }
}
