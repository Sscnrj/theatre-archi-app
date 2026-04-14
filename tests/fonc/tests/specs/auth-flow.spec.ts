import { BaseTest, test } from '../fixtures/base-test';
import type { AppFixtures } from '../fixtures/base-test';

type AuthScenarioFixtures = Pick<AppFixtures, 'user' | 'authFeature' | 'navigationFeature'>;

class AuthFlowTest extends BaseTest<AuthScenarioFixtures> {
  async assertProtectedRouteRedirect(): Promise<void> {
    this.annotate('Auth', 'Guard redirect');
    await this.fixtures.authFeature.assertProtectedRouteRedirect();
  }

  async registerThenLogin(): Promise<void> {
    this.annotate('Auth', 'Register and login');
    await this.fixtures.authFeature.register(this.fixtures.user);
    await this.fixtures.authFeature.login(this.fixtures.user);
    await this.fixtures.navigationFeature.expectSessionEmail(this.fixtures.user.email);
  }
}

test.describe('Parcours auth', () => {
  test(
    'redirige vers login quand la route est protegee',
    { tag: ['@auth', '@guard'] },
    async ({ user, authFeature, navigationFeature }, testInfo) => {
      const scenario = new AuthFlowTest({ user, authFeature, navigationFeature }, testInfo);
      await scenario.assertProtectedRouteRedirect();
    },
  );

  test(
    'inscription puis connexion avec un utilisateur reel',
    { tag: ['@auth', '@smoke'] },
    async ({ user, authFeature, navigationFeature }, testInfo) => {
      const scenario = new AuthFlowTest({ user, authFeature, navigationFeature }, testInfo);
      await scenario.registerThenLogin();
    },
  );
});
