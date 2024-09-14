import { DynamicModule } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { FirebaseAuthService } from './firebase-auth.service';
import {
  FIREBASE_MODULE_OPTIONS,
  FirebaseModuleAsyncOptions,
  FirebaseModuleOptions,
} from './firebase.module-options';

export class FirebaseModule {
  static forRoot(options: FirebaseModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
      providers: [
        {
          provide: FIREBASE_MODULE_OPTIONS,
          useValue: options,
        },
        FirebaseAdminService,
        FirebaseAuthService,
      ],
      exports: [FirebaseAdminService, FirebaseAuthService],
    };
  }

  static forRootAsync(options: FirebaseModuleAsyncOptions): DynamicModule {
    return {
      module: FirebaseModule,
      imports: options.imports || [],
      providers: [
        {
          provide: FIREBASE_MODULE_OPTIONS,
          inject: options.inject || [],
          useFactory: options.useFactory,
        },
        FirebaseAdminService,
        FirebaseAuthService,
      ],
      exports: [FirebaseAuthService],
    };
  }
}
