enum CommandEnum {
  CREATE = "CREATE",
  LIST = "LIST",
  MOVE = "MOVE",
  DELETE = "DELETE",
}

type CommandInterface = {
  name: CommandEnum;
  method: String;
  messageError?: Error;
};

class CommandHandler {
  constructor() {}

  processResponseData = (data: String): CommandInterface[] => {
    const lines = data?.split("\n");
    return lines.map(this.processCommand);
  };

  processCommand = (line: string): CommandInterface => {
    // validate and process commands if valid
    return null;
  };
}

export default CommandHandler;
