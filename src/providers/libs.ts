import { Consumer } from '../libs';
import { Services } from './index';

class Libs {
    async initRabbitMQ(): Promise<void> {
        const consumer = new Consumer(Services.listener);
        consumer.connect();
    }
}

export default new Libs();
