import { StartWorkerMessage, ITastePref } from "@/types/food";
import { testMenuWorker } from "./testMenuWorker";

onmessage = function (e: MessageEvent<StartWorkerMessage>) {
  if (e.data.message === "start_worker") {
    const tasteMap = new Map<string, number>(Object.entries(e.data.taste));

    e.data.taste = tasteMap;
    testMenuWorker(e.data);
  }
};
