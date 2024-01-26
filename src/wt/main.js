import { Worker, isMainThread } from "worker_threads";
import os from "os";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const numCores = os.cpus().length;

const createWorker = (data) => {
  return new Promise((resolve, reject) => {
    const workerPath = path.join(__dirname, "worker.js");

    const worker = new Worker(workerPath, { workerData: data });

    worker.on("message", (result) => {
      resolve({ status: "resolved", data: result });
      worker.terminate();
    });

    worker.on("error", (error) => {
      reject({ status: "error", data: null });
      worker.terminate();
    });
  });
};

const performCalculations = async () => {
  if (isMainThread) {
    const results = [];

    const workers = Array.from({ length: numCores }, (_, index) =>
      createWorker(10 + index)
    );

    try {
      const workerResults = await Promise.all(workers);
      results.push(...workerResults);
    } catch (error) {
      console.error("Error in worker:", error);
    }

    console.log("Results:", results);
  }
};

await performCalculations();
