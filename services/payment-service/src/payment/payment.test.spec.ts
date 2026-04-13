/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { NotFoundException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should create a PAID payment when amount is under limit', () => {
    const result = service.pay({
      reservationId: 1,
      userId: 10,
      amount: 25,
    });

    expect(result.paymentId).toBeDefined();
    expect(result.status).toBe('PAID');
    expect(result.amount).toBe(25);
    expect(result.createdAt).toBeDefined();
    expect(result.reason).toBeUndefined();
  });

  it('should create a FAILED payment when amount exceeds limit', () => {
    const result = service.pay({
      reservationId: 1,
      userId: 10,
      amount: 100,
    });

    expect(result.status).toBe('FAILED');
    expect(result.reason).toBe('AMOUNT_EXCEEDS_LIMIT');
  });

  it('should round amount to 2 decimals', () => {
    const result = service.pay({
      reservationId: 1,
      userId: 10,
      amount: 10.567,
    });

    expect(result.amount).toBe(10.57);
  });

  it('should store and retrieve payment by id', () => {
    const payment = service.pay({
      reservationId: 1,
      userId: 10,
      amount: 20,
    });

    const result = service.getById(payment.paymentId);

    expect(result).toEqual(payment);
  });

  it('should throw NotFoundException if payment does not exist', () => {
    expect(() => service.getById('invalid_id')).toThrow(
      NotFoundException,
    );
  });

  it('should generate unique payment IDs', () => {
    const p1 = service.pay({ reservationId: 1, userId: 1, amount: 10 });
    const p2 = service.pay({ reservationId: 1, userId: 1, amount: 10 });

    expect(p1.paymentId).not.toBe(p2.paymentId);
  });
});