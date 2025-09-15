import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities/permission.entity';
import { Role } from '@/roles/entities/role.entity';
import { User } from '@/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    JwtModule.register({
      secret: 'your_jwt_secret', // Usa un secreto seguro en producción
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [PermissionsService],
  //   controllers: [PermissionsController],
  exports: [PermissionsService],
})
export class PermissionsModule {}
