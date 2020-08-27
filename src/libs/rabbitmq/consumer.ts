import amqp from 'amqplib/callback_api';
import config from '../../config';

class Consumer {
    private _connection: any;
    private readonly _connection_options: {
        protocol: string;
        hostname: string;
        password: string;
        port: number;
        username: string;
        vhost: string;
    };
    private _channel: any;
    private readonly listener: (
        message: any,
        cb: (ok: boolean) => void
    ) => void;

    constructor(listener: (message: any, cb: (ok: boolean) => void) => void) {
        this._connection = undefined;
        this._connection_options = {
            protocol: 'amqp',
            hostname: config.RABBITMQ_HOST,
            port: config.RABBITMQ_PORT,
            username: config.RABBITMQ_USERNAME,
            password: config.RABBITMQ_PASSWORD,
            vhost: config.RABBITMQ_VHOST,
        };
        this._channel = undefined;
        this.listener = listener;
    }

    get connection(): amqp.Connection {
        return this._connection;
    }

    set connection(conn: amqp.Connection) {
        this._connection = conn;
    }

    get channel(): amqp.ConfirmChannel {
        return this._channel;
    }

    set channel(channel: amqp.ConfirmChannel) {
        this._channel = channel;
    }

    connect(): void {
        amqp.connect(
            { ...this._connection_options },
            (err: Error, connection: amqp.Connection) => {
                if (err) {
                    throw err;
                }
                this.connection = connection;
                this.startConsumer();
            }
        );
    }
    // A worker that acks messages only if processed succesfully
    startConsumer(): void {
        this.connection.createChannel((err: Error, ch: amqp.Channel) => {
            if (this.closeOnErr(err)) {
                return;
            }
            ch.on('error', (err: Error) =>
                console.error('[AMQP] channel error', err.message)
            );
            ch.on('close', () => console.log('[AMQP] channel closed'));

            ch.assertExchange('web', 'direct', {durable: false})

            ch.assertQueue('', {
                exclusive: true
            }, (err: Error, q) => {
                if (err) {
                    throw err;
                }

                ch.bindQueue(q.queue, 'web', '');

                ch.consume(q.queue, processMsg);
            });

            const processMsg = (msg: any) => {
                this.listener(msg, (ok: boolean) => {
                    try {
                        if (ok) ch.ack(msg);
                        else ch.reject(msg, true);
                    } catch (e) {
                        this.closeOnErr(e);
                    }
                });
            };
        });
    }

    closeOnErr(err: Error): boolean {
        if (!err) return false;
        console.error('[AMQP] error', err);
        this.connection.close();
        return true;
    }
}

export default Consumer;
