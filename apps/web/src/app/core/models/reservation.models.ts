export interface ReservationItem {
  id: number;
  spectacleId: number;
  titreSpectacle: string;
  nombrePlaces: number;
  montantTotal: number;
  dateReservation: string;
}

export interface CreateReservationRequest {
  spectacleId: number;
  nombrePlaces: number;
}
