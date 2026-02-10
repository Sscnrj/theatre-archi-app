import { IsInt, IsNumber, Min } from 'class-validator';

export class PayDto {
  @IsInt()
  @Min(1)
  reservationId: number;

  @IsInt()
  @Min(1)
  userId: number;

  // Montant total de la réservation en euros (ex: 24.00)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount: number;
}
