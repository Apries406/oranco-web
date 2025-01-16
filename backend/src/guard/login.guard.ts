import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

interface JwtUserData {
  id: number
  username: string
  email: string
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private reflector: Reflector;

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ')?? [];
    return type === 'Bearer'? token : undefined;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获得 request 上下文
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify<JwtUserData>(token);
      request['user'] = payload;
      return true;
    } catch {
      return false;
    }
    
  }
}
