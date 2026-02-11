export interface Spectacle {
  id: number;
  titre: string;
  description: string;
  date_spectacle: string; // "YYYY-MM-DD" ou ISO
  prix: number;
  image_url?: string | null;
  nb_places_total: number;
  nb_places_restantes: number;
}
