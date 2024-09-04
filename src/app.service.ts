import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('Hello World!', { foo: 'bar' });
    this.logger.log('test string interpolated value', 'arg 1');
    return 'Hello World!';
  }
}
