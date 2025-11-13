import { HttpException, HttpStatus } from '@nestjs/common';

export function successResponse(data: any, message = 'Success') {
  return {
    isPass: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data,
    message,
  };
}

export function errorResponse(
  message: string,
  status = HttpStatus.BAD_REQUEST,
) {
  throw new HttpException(
    {
      isPass: false,
      data: null,
      message,
    },
    status,
  );
}
