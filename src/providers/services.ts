class Services {
    listener(message: any, cb: (ok: boolean) => void): void {
        console.log('Got msg', message.content.toString());
        const content = JSON.parse(message.content.toString())
        console.log(content['message']);
        cb(true);
    }
}
export default new Services();
