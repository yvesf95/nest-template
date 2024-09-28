import { BadRequestException, Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { CustomError } from '../common/error';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiInternalServerErrorResponse({ schema: { example: new InternalServerErrorException() } })
  @Get('error')
  getError(): string {
    throw new Error('This is an error');
  }

  @ApiBadRequestResponse({ schema: { example: new BadRequestException() } })
  @Get('http-exception')
  getHttpException(): string {
    throw new BadRequestException({ message: 'This is an http exception', foo: 'bar' });
  }

  @ApiBadRequestResponse({
    schema: { example: new CustomError({ message: 'This is a custom error' }) },
  })
  @Get('custom-error')
  getCustomError(): string {
    throw new CustomError({
      name: 'CUSTOM_ERROR_NAME',
      code: 'ERR_1000',
      message: 'This is for testing the custom exception only',
      description: 'lorem ipsum',
      status: 400,
      extra: { foo: 'bar' },
    });
  }
}
