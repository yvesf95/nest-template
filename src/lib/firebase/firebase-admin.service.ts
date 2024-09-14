import { Inject, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_MODULE_OPTIONS, FirebaseModuleOptions } from './firebase.module-options';

@Injectable()
export class FirebaseAdminService {
  private readonly app: admin.app.App;
  private readonly logger: Logger = new Logger(FirebaseAdminService.name);

  constructor(@Inject(FIREBASE_MODULE_OPTIONS) options: FirebaseModuleOptions) {
    if (!options.serviceAccount) {
      this.logger.warn(
        `Firebase credential is not provided. Using application default credentials.`,
      );
      this.app = admin.initializeApp();
      this.logger.log('Firebase App initialized.');
      return;
    }

    /** Initialize the firebase admin app. */
    this.app = admin.initializeApp({
      credential: admin.credential.cert(options.serviceAccount),
    });
  }

  getAuth() {
    return this.app.auth();
  }
}
