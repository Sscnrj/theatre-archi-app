export type ReservationStatut = 'CONFIRMEE' | 'ANNULEE';

export interface Reservation {
  id_reservation: number;
  date_reservation: string; // ISO
  montant_total: number;
  statut: ReservationStatut;
}
