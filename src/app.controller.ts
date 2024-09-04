import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomError } from './common/error/custom.error';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getError(): string {
    const error = new CustomError({
      name: 'CUSTOM_ERROR_NAME',
      code: 'ERR_1000',
      message: 'This is for testing the custom exception only',
      description: 'lorem ipsum',
      httpStatus: 400,
      extra: { foo: 'bar' },
    });

    console.log('error.name', error.name);
    console.log('error.code', error.code);
    console.log('error.message', error.message);
    console.log('error.description', error.description);
    console.log('error.httpStatus', error.httpStatus);
    console.log('error.params', error.params);

    throw error;
  }
}
