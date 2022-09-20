export class WorkerController {
    worker: Worker;
    constructor(worker: Worker) {
        this.worker = worker;
    }
    processMessage(message: any) {}

    postMessage(message: any) {
        this.worker.postMessage(message);
    }
    terminate() {
        this.worker.terminate();
    }
}
