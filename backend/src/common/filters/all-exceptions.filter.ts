import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message =
        typeof res === 'string'
          ? res
          : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (res as any)?.message || 'Something went wrong';

      if (Array.isArray(message)) {
        message = message.join(', ');
      }
    }

    response.status(status).json({
      isPass: false,
      data: null,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message,
      statusCode: status,
    });
  }
}
