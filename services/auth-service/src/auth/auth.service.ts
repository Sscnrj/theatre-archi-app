import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/users.entity';


@Injectable()
export class AuthService {
constructor(
private usersService: UsersService,
private jwtService: JwtService,
) {}


async register(dto: RegisterDto) {
const existing = await this.usersService.findByEmail(dto.email);
if (existing) throw new ConflictException('Email already in use');


const hashed = await bcrypt.hash(dto.password, 10);

const user = await this.usersService.create({
  email: dto.email,
  motDePasse: hashed,
  nom: dto.nom,
  prenom: dto.prenom,
  role: UserRole.USER,
});


const { motDePasse, ...rest } = user as any;
return { message: 'User created successfully', user: rest };
}


async validateUser(email: string, password: string) {
const user = await this.usersService.findByEmail(email);
if (!user) return null;
const valid = await bcrypt.compare(password, user.motDePasse);
if (!valid) return null;
const { motDePasse, ...rest } = user as any;
return rest;
}


async login(dto: LoginDto) {
const user = await this.usersService.findByEmail(dto.email);
if (!user) throw new UnauthorizedException('Invalid credentials');
const valid = await bcrypt.compare(dto.password, user.motDePasse);
if (!valid) throw new UnauthorizedException('Invalid credentials');


const payload = { sub: user.id, email: user.email, role: user.role };
const access_token = this.jwtService.sign(payload);


const { motDePasse, ...rest } = user as any;
return { access_token, user: rest };
}
}