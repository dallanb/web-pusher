import { logger } from '../common';
import { Admin } from '../libs/firebase';

class Services {
    listener(message: any, cb: (ok: boolean) => void): void {
        console.log('Got msg', message.content.toString());
        const content = JSON.parse(message.content.toString());
        console.log(content);
        Admin.send([content['token']], {
            title: 'Golf Tapir',
            body: content['message'],
            icon: `https://golftapir.s3-us-west-2.amazonaws.com/account/avatars/${content['sender']}.jpeg`,
        }).then(() => cb(true));
    }
}
export default new Services();
