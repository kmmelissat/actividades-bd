import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchService } from './merch.service';
import { MerchController } from './merch.controller';
import { Merch } from './entities/merch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Merch])],
  controllers: [MerchController],
  providers: [MerchService],
  exports: [MerchService],
})
export class MerchModule {}
