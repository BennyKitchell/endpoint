enum CommandEnum {
  CREATE = "CREATE",
  LIST = "LIST",
  MOVE = "MOVE",
  DELETE = "DELETE",
}

type CommandInterface = {
  name: CommandEnum;
  folder: String;
  messageError?: Error;
};

class CommandHandler {
  constructor() {}

  processResponseData = (data: String): CommandInterface[] => {
    const lines = data?.split("\n");
    return lines.map(this.processCommand);
  };

  processCommand = (line: string): CommandInterface => {
    line = line.trim();
    const commandArray: string[] = line.split(" ");
    const commandName = commandArray.shift() || "";

    let command: CommandInterface = {
      name: commandName as CommandEnum,
      folder: commandArray.join(" "),
    };

    if (!(commandName in CommandEnum)) {
      command.messageError = new Error(
        `Invalid Input: The command ${!!commandName ? commandName : "EMPTY LINE"} is not valid`,
      );
    }
    return command;
  };
}

export default CommandHandler;
