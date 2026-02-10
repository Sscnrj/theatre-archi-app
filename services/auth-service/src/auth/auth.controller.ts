import {
Controller,
Post,
Body,
HttpCode,
HttpStatus,
UseGuards,
Get,
Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';


@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}


@Post('register')
async register(@Body() dto: RegisterDto) {
return this.authService.register(dto);
}


@HttpCode(HttpStatus.OK)
@Post('login')
async login(@Body() dto: LoginDto) {
return this.authService.login(dto);
}


@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
// req.user is set by JwtStrategy
return req.user;
}
}