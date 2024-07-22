import { FastifyInstance } from "fastify";

class FileRoute {
  constructor() {}

  file = async (fastify: FastifyInstance) => {
    fastify.post("/upload/file", (req, reply) => {
      console.log("Route is working");
      reply.send();
    });
  };
}

export default FileRoute;
