import cluster from "node:cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpu = os.cpus().length;

console.log("The CPU count is ", cpu);
console.log("Primary pid=", process.pid);
console.log("file,", __dirname + "/index.js");
cluster.setupPrimary({
  exec: __dirname + "/index.js",
});

for (let index = 0; index < cpu; index++) {
  cluster.fork();
}

cluster.on("exit", (w) => {
  console.log(`worker ${w.process.pid} has been killed. Spawning new one..`);
  cluster.fork();
});
