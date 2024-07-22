import Fastify from "fastify";
import FileRoute from "./lib/routes/file.js";

const app = Fastify({ logger: true });
export const buildServer = async () => {
  try {
    const File = new FileRoute();
    await app.register(File.file);
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

buildServer();
