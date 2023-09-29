import "dotenv/config";
import { createServer } from "./lib/createServer";
import { loadBalancer } from "./lib/loadBalancer";

if (process.env.CLUSTER === "true") {
  await loadBalancer(createServer);
} else {
  await createServer();
}
