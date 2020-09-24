import { Consumer, Admin } from '../libs';
import { Services } from './index';

class Libs {
    async initRabbitMQ(): Promise<void> {
        const consumer = new Consumer(Services.listener);
        consumer.connect();
    }
    async initFirebase(): Promise<void> {
        Admin.init();
    }
}

export default new Libs();
