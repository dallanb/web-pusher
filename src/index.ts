import { App, Libs, Middlewares } from './providers';

const run = async () => {
    await Libs.initRabbitMQ();
    await Libs.initFirebase();

    // middlewares
    Middlewares.initLogger(App.application);

    App.listen();
};

run()
    .then(() => console.log('APP READY'))
    .catch((err) => console.error('APP NOT READY'));
