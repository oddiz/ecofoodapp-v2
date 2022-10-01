import { ICalcWorkerMessage, IBestMenus, CalculateParameters } from "@/types/food";
import EventEmitter from "eventemitter3";
export class WorkerController extends EventEmitter {
    worker: Worker;
    bestMenus: null | IBestMenus;
    calculateParameters: null | CalculateParameters;

    status: "idle" | "calculating" | "done";

    constructor(worker: Worker) {
        super();
        this.worker = worker;

        this.status = "idle";
        this.bestMenus = null;
        this.worker.onmessage = this.processMessage;

        this.calculateParameters = null;
    }
    processMessage(message: MessageEvent<ICalcWorkerMessage>) {
        if (message.data.op === "best_menus_update") {
            this.bestMenus = message.data.result;
            this.emit("best_menus_update");
        } else if (message.data.op === "calculation_end") {
            this.status = "done";
            this.emit("done");
            this.terminate();
        } else {
            console.error("Unknown message received from worker: ", message);
        }
    }

    postMessage(message: any) {
        this.worker.postMessage(message);
    }
    terminate() {
        this.status = "idle";
        this.worker.terminate();
    }
    start(calcParams: CalculateParameters) {
        this.status = "calculating";
        this.calculateParameters = calcParams;
        const { foods, filters, taste, menuSize, calculateType } = calcParams;

        this.postMessage({
            origin: "main",
            message: "start_worker",
            foods,
            filters,
            taste,
            menuSize,
            calculateType,
        });
    }
}
