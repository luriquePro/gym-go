import { App } from "./app";

const app = App.getInstance();
app.start();

process.on("SIGINT", () => {
  app.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  app.stop();
  process.exit(0);
});