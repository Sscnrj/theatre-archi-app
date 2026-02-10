import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { buildTypeOrmConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(buildTypeOrmConfig()),
        UsersModule,
        AuthModule,
    ],
})
export class AppModule { }