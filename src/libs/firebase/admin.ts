import admin from 'firebase-admin';
import _ from 'lodash';
import Messaging = admin.messaging.Messaging;
import config from '../../config';
import { logger } from '../../common';

class Admin {
    private readonly _serviceAccount: any;
    private readonly _credential: admin.credential.Credential;
    private readonly _databaseURL: string;
    private _messaging?: Messaging;

    constructor() {
        this._serviceAccount = require(config.GOOGLE_APPLICATION_CREDENTIALS);
        this._credential = admin.credential.cert(this.serviceAccount);
        this._databaseURL = config.DATABASE_URL;
        this._messaging = undefined;
    }

    get serviceAccount(): any {
        return this._serviceAccount;
    }

    get messaging(): Messaging | undefined {
        return this._messaging;
    }

    set messaging(messaging) {
        this._messaging = messaging;
    }

    init(): void {
        admin.initializeApp({
            credential: this._credential,
            databaseURL: this._databaseURL,
        });
        this.messaging = admin.messaging();
        logger.info('Firebase Admin Ready');
    }

    async send(tokens: any, data: any): Promise<void> {
        try {
            if (!this.messaging) {
                throw new Error('Wait for Firebase Admin to be Ready');
            }
            const res = await this.messaging?.sendMulticast({ tokens, data });
            const parts = _.partition(res.responses, ({ success }) => success);
            logger.info(
                `Notifications sent: ${parts[0].length} successful, ${parts[1].length} failed`
            );
        } catch (err) {
            logger.error('Error sending message: ', err);
        }
    }
}

export default new Admin();
