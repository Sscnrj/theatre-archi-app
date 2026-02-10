import { Injectable, NotFoundException } from '@nestjs/common';
import { PayDto } from './dto/pay.dto';

export type PaymentStatus = 'PAID' | 'FAILED';

export interface Payment {
  paymentId: string;
  reservationId: number;
  userId: number;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  reason?: string;
}

@Injectable()
export class PaymentService {
  private payments = new Map<string, Payment>();

  // Seuil de simulation : au-dessus => échec
  // (tu peux le mettre en .env plus tard)
  private readonly maxAmount = Number(process.env.PAYMENT_MAX_AMOUNT ?? 50);

  pay(dto: PayDto): Payment {
    const paymentId = this.generatePaymentId();
    const { status, reason } = this.simulatePayment(dto.amount);

    const payment: Payment = {
      paymentId,
      reservationId: dto.reservationId,
      userId: dto.userId,
      amount: this.round2(dto.amount),
      status,
      createdAt: new Date().toISOString(),
      ...(reason ? { reason } : {}),
    };

    this.payments.set(paymentId, payment);
    return payment;
  }

  getById(paymentId: string): Payment {
    const payment = this.payments.get(paymentId);
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  private simulatePayment(amount: number): { status: PaymentStatus; reason?: string } {
    const a = this.round2(amount);

    if (a > this.maxAmount) {
      return { status: 'FAILED', reason: 'AMOUNT_EXCEEDS_LIMIT' };
    }
    return { status: 'PAID' };
  }

  private round2(v: number): number {
    return Math.round(v * 100) / 100;
  }

  private generatePaymentId(): string {
    return `pay_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
  }
}
