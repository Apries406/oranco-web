import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entities';
import { JwtModule } from '@nestjs/jwt';
import { DocumentsModule } from './documents/documents.module';
import { Document } from './documents/entities/document.entities';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './guard/login.guard';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 13306,
      username: 'root',
      password: 'Cxhzs067311.',
      database: 'oranco',
      synchronize: true,
      entities: [User, Document],
      logging: true,
      connectorPackage: 'mysql2',
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'chenxinhaozuishuai',
          signOptions: { expiresIn: '1h' },
        }
      }
    }),
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
