import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { XAuthGuard } from './guards/x-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  async discordLogin(@Request() req) {}

  @Get('discord/callback')
  @UseGuards(DiscordAuthGuard)
  @HttpCode(HttpStatus.OK)
  async discordLoginCallback(@Request() req) {
    console.log(req.user);
  }

  @Get('x')
  @UseGuards(XAuthGuard)
  async xLogin(@Request() req) {}

  @Get('x/callback')
  @UseGuards(XAuthGuard)
  @HttpCode(HttpStatus.OK)
  async xLoginCallback(@Request() req) {
    console.log(req.user);
  }
}
