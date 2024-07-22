import Fastify from "fastify";
import multipart from "fastify-multipart";
import cors from "@fastify/cors";
import FileRoute from "./lib/routes/file.js";

const app = Fastify({ logger: true });
export const buildServer = async () => {
  try {
    const File = new FileRoute();
    await app.register(multipart);
    await app.register(File.file);
    await app.register(cors);
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

buildServer();
