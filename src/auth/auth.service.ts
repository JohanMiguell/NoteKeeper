import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bycrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterAuthDto) {
        const user = await this.userService.create(registerDto);
        const { password, ...result } = user;
        return result;
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && (await bycrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new Error('Invalid credentials');
}
    async login(user: any) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}