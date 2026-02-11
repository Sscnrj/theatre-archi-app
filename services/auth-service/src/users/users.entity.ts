import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'utilisateur' }) // ou 'utilisateur' selon votre DB (casse importante !)
export class User {
  @PrimaryGeneratedColumn({ name: 'id_utilisateur' })
  id: number;

  @Column({ name: 'nom' })
  nom: string;

  @Column({ name: 'prenom' })
  prenom: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'mot_de_passe' })
  motDePasse: string; // hash bcrypt stocké ici

  @Column({ name: 'role', type: 'text', default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;
}
