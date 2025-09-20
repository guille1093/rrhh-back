import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: User;
    }>;
}
