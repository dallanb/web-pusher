declare var process: {
    env: {
        ENV: string;
        PORT: number;
        RABBITMQ_HOST: string;
        RABBITMQ_PORT: number;
        RABBITMQ_USERNAME: string;
        RABBITMQ_PASSWORD: string;
        RABBITMQ_VHOST: string;
        GOOGLE_APPLICATION_CREDENTIALS: string;
        DATABASE_URL: string;
    };
};

class Config {
    ENV: string = process.env.ENV;
    PORT: number = process.env.PORT;
    RABBITMQ_HOST: string = process.env.RABBITMQ_HOST;
    RABBITMQ_PORT: number = process.env.RABBITMQ_PORT;
    RABBITMQ_USERNAME: string = process.env.RABBITMQ_USERNAME;
    RABBITMQ_PASSWORD: string = process.env.RABBITMQ_PASSWORD;
    RABBITMQ_VHOST: string = process.env.RABBITMQ_VHOST;
    GOOGLE_APPLICATION_CREDENTIALS: string = process.env.GOOGLE_APPLICATION_CREDENTIALS; // path to service account json file
    DATABASE_URL: string = process.env.DATABASE_URL
}

export default new Config();
