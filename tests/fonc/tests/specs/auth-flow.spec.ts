import { expect, test } from '@playwright/test';
import { createUniqueUser, loginThroughUi, registerThroughUi } from '../helpers/auth.helper';

test.describe('Parcours auth', () => {
  test('redirige vers login quand la route est protégée', async ({ page }) => {
    await page.goto('/reservations');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
  });

  test('inscription puis connexion avec un utilisateur réel', async ({ page }) => {
    const user = createUniqueUser();

    await registerThroughUi(page, user);
    await loginThroughUi(page, user);

    await expect(page).toHaveURL(/\/spectacles$/);
  });
});
