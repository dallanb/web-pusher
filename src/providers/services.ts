class Services {
    listener(message: any, cb: (ok: boolean) => void): void {
        console.log('Got msg', message.content.toString());
        cb(true);
    }
}
export default new Services();
