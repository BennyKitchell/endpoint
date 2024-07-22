class FileController {
  constructor() {}

  async parseFile(file): Promise<String> {
    const buffer = await file.toBuffer();
    const text = buffer.toString();
    return text;
  }
}

export default FileController;
