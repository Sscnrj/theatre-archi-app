export interface Show {
  id: number;
  title: string;
  place: string;
  address: string;
  date: string;
  imageUrl: string;
  ticketUrl?: string;
  priceMin?: number;
  priceMax?: number;
}
