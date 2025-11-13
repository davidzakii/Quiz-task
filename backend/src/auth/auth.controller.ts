import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { errorResponse, successResponse } from 'src/utils/api-response';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerDto: RegisterUserDto) {
    try {
      const createdUser = await this.authService.register(registerDto);
      return successResponse(createdUser, 'User registered successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';

      return errorResponse(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const token = await this.authService.login(
        loginDto.email,
        loginDto.password,
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return successResponse(token, 'Login successful');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      return errorResponse(message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('validate-session')
  @HttpCode(200)
  validateSession(
    @Req() req: Request & { cookies: { [key: string]: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = req.cookies['token'];
    if (!token) {
      return errorResponse('Session expired', HttpStatus.UNAUTHORIZED);
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const payload = this.authService.validateToken(token);

      return successResponse(payload, 'Session valid');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      res.clearCookie('token');
      return errorResponse('Invalid session', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return successResponse(null, 'Logout successful');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: { user: any }): any {
    return req.user;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('dashboard')
  getAdminDashboard() {
    return { message: 'Welcome Admin!' };
  }
}
