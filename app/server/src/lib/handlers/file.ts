import FileController from "../controller/file.js";
import CommandHandler from "./command.js";

class FileHandler {
  private fileController: FileController;
  private commandHandler: CommandHandler;
  constructor() {
    this.fileController = new FileController();
    this.commandHandler = new CommandHandler();
  }

  uploadFileHandler = async (req, res) => {
    const fileData = await req.file();
    const fileContents = await this.fileController.parseFile(fileData);
    const commands = this.commandHandler.processResponseData(fileContents);
    res.send();
  };
}

export default FileHandler;
