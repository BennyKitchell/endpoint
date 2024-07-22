import { FastifyInstance } from "fastify";
import FileHandler from "../handlers/file.js";

class FileRoute {
  private fileHandler: FileHandler
  constructor() {
    this.fileHandler = new FileHandler();
  }

  file = async (fastify: FastifyInstance) => {
    fastify.post("/upload/file", this.fileHandler.uploadFileHandler);
  };
}

export default FileRoute;
