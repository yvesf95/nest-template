import { ModuleMetadata, Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';

export const FIREBASE_MODULE_OPTIONS = 'PASSWORD_AUTH_MODULE_OPTIONS';

export type FirebaseModuleOptions = {
  serviceAccount: admin.ServiceAccount;
};

export type FirebaseModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & {
  useFactory: (...args: any[]) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
};
