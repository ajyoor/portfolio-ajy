import { Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { TokenService } from './shared/token.service';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(RateLimiterGuard)
  @Get('token')
  async getToken(@Res({ passthrough: true }) res: Response) {
    const token = this.tokenService.generateToken();

    res.cookie('clientToken', token, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    return { token };
  }
}
