import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService, Payment } from './payment.service';
import { PayDto } from './dto/pay.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Endpoint unique (simple)
  @Post('pay')
  pay(@Body() dto: PayDto): Payment {
    return this.paymentService.pay(dto);
  }

  // Optionnel mais utile en démo
  @Get(':paymentId')
  get(@Param('paymentId') paymentId: string): Payment {
    return this.paymentService.getById(paymentId);
  }
}
