import CommandController from "../controller/command.js";

enum CommandEnum {
  CREATE = "CREATE",
  LIST = "LIST",
  MOVE = "MOVE",
  DELETE = "DELETE",
}

type CommandFunction = (command: CommandInterface) => String;

type CommandInterface = {
  name: CommandEnum;
  folder: String;
  messageError?: Error;
};

class CommandHandler {
  private commandController;
  constructor() {
    this.commandController = new CommandController();
  }
  private commandMap: Map<CommandEnum, CommandFunction> = new Map([
    [
      CommandEnum.CREATE,
      (command) => {
        return this.commandController.create(command.folder!);
      },
    ],
    [
      CommandEnum.LIST,
      (command) => {
        return this.commandController.list();
      },
    ],
    [
      CommandEnum.MOVE,
      (command) => {
        return this.commandController.move(command.folder!);
      },
    ],
    [
      CommandEnum.DELETE,
      (command) => {
        return this.commandController.delete(command.folder!);
      },
    ],
  ]);

  parseCommands = (commandList: CommandInterface[]) => {
    return commandList.map((command) => {
      if (command.messageError) {
        return command.messageError.message;
      } else {
        const commandFunction = this.commandMap.get(command.name);
        if (!commandFunction) {
          throw Error(`Command ${command.name} without implementation`);
        }
        return commandFunction(command);
      }
    });
  };

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

  clearState = () => {
    this.commandController.clearState();
  };
}

export default CommandHandler;
