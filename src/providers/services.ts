import { logger } from '../common';
import { Admin } from '../libs/firebase';

class Services {
    listener(message: any, cb: (ok: boolean) => void): void {
        console.log('Got msg', message.content.toString());
        const content = JSON.parse(message.content.toString());
        console.log(content['token']);
        Admin.send([content['token']], {
            title: 'Baby D',
            body: "It's LIT",
        }).then(() => cb(true));
    }
}
export default new Services();
