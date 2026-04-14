export interface TestUser {
  email: string;
  password: string;
  nom: string;
  prenom: string;
}

export function createUniqueUser(): TestUser {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 100_000)}`;

  return {
    email: `e2e.user.${uniqueSuffix}@example.test`,
    password: 'Password123!',
    nom: 'E2E',
    prenom: `User${uniqueSuffix}`,
  };
}
