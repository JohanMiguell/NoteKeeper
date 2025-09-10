import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserModule } from './user/user.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),

  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ADMIN',
    database: 'note_keeper',
    autoLoadEntities: true,
    synchronize: true,
    }), 
    UserModule
  ],
})
export class AppModule {}
