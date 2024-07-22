import FileController from "../controller/file.js";

class FileHandler {
  private fileController: FileController;
  constructor() {
    this.fileController = new FileController();
  }

  uploadFileHandler = async (req, res) => {
    const fileData = await req.file();
    const fileContents = await this.fileController.parseFile(fileData);
    console.log(fileContents);
    res.send();
  };
}

export default FileHandler;
