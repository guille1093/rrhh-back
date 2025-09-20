import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AuthModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
