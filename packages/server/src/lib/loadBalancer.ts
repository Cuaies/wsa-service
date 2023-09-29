import cluster from "cluster";
import { cpus } from "os";

/**
 * Represents the number of CPU cores available on the machine.
 */
export const CPUCoreNum = cpus().length;

/**
 * Basic load balancer that forks the process for each CPU core.
 */
export const loadBalancer = async (cb: () => Promise<void>) => {
  if (cluster.isPrimary) {
    console.log(`Master process started [pid=${process.pid}]`);

    for (let i = 0; i < CPUCoreNum; i++) {
      const worker = cluster.fork();

      worker
        .on("online", () => {
          console.log(`Worker process started [pid=${worker.process.pid}]`);
        })
        .on("exit", (code, signal) => {
          if (signal) {
            console.log(
              `Worker process killed by signal: ${signal} [pid=${worker.process.pid}]`
            );
          } else if (code !== 0) {
            console.log(
              `Worker process exited with error code: ${code} [pid=${worker.process.pid}]`
            );
          } else {
            console.log(
              `Worker process exited gracefully [pid=${worker.process.pid}]`
            );
          }
        })
        .on("error", (e) => {
          console.log(`Worker process error: ${e} [pid=${worker.process.pid}]`);
        });
    }
  } else {
    cb();
  }
};
