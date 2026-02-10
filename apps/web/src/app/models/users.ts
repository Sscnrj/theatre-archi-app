export interface User {
  id?: number;          // optionnel si non encore créé
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: 'USER' | 'ADMIN';
  dateCreation?: Date;  // optionnel, peut être rempli automatiquement
}
