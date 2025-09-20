import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class PermissionsGuard implements CanActivate {
    private reflector;
    private jwtService;
    private usersService;
    constructor(reflector: Reflector, jwtService: JwtService, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
