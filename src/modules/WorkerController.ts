import { ICalcWorkerMessage, IBestMenus, CalculateParameters, StartWorkerMessage } from "@/types/food";
import EventEmitter from "eventemitter3";
export class WorkerController extends EventEmitter {
    worker: Worker;
    bestMenus: null | IBestMenus;
    calculateParameters: null | CalculateParameters;

    state: "idle" | "calculating" | "done";

    constructor(worker: Worker) {
        super();
        this.worker = worker;

        this.state = "idle";
        this.bestMenus = null;
        this.worker.onmessage = (message) => this.processMessage(message);
        this.processMessage.bind(this);

        this.calculateParameters = null;
    }
    processMessage(message: MessageEvent<ICalcWorkerMessage>) {
        if (message.data.op === "best_menus_update") {
            this.bestMenus = message.data.result;
            this.emit("best_menus_update");
        } else if (message.data.op === "calculation_end") {
            this.state = "done";
            this.emit("done");
        } else {
            console.error("Unknown message received from worker: ", message);
        }
    }

    postMessage(message: any) {
        this.worker.postMessage(message);
    }
    terminate() {
        this.state = "idle";
        this.worker.terminate();
    }
    start(calcParams: CalculateParameters) {
        this.state = "calculating";
        this.calculateParameters = calcParams;
        const { foods, filters, taste, menuSize, calculateType } = calcParams;

        this.postMessage({
            message: "start_worker",
            foods,
            filters,
            taste,
            menuSize,
            calculateType,
        });
    }
}
