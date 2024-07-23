export interface FolderDirectory {
  name: String;
  folders: FolderDirectory[];
}

class CommandController {
  private initFolder: FolderDirectory;

  constructor() {
    this.initFolder = {
      name: "init",
      folders: [],
    };
  }

  private createSubFolder(
    actionArgument: String,
    names: String[],
    parentFolder: FolderDirectory,
    index: number = 0,
  ): Boolean | String {
    if (index === names.length - 1) {
      return this.createSingleFolder(names[index], parentFolder);
    }
    const childFound = parentFolder.folders.find(
      (folder) => folder.name === names[index],
    );
    if (!childFound) {
      return (
        "Invalid Input: Cannot create " +
        actionArgument +
        " - " +
        names[index] +
        " does not exist"
      );
    }
    return this.createSubFolder(actionArgument, names, childFound, index + 1);
  }

  private createSingleFolder(
    name: String,
    parentFolder: FolderDirectory,
  ): Boolean | String {
    let response = "";
    const folderFound = parentFolder.folders.find(
      (folder) => folder.name === name,
    );
    if (folderFound) {
      return (response =
        "Invalid Input: Cannot create " +
        name +
        ". " +
        name +
        " already exists");
    } else {
      parentFolder.folders.push({
        name,
        folders: [],
      });
    }
    return true;
  }

  private printFolders(
    folders: FolderDirectory[],
    level: number = 0,
    response: string = "",
  ): string {
    if (folders?.length === 0) {
      return response;
    }
    folders
      .sort((fa, fb) => fa.name.localeCompare(String(fb.name)))
      .forEach((f) => {
        response = response.concat(
          // HTML string to display correctly on client side
          `<br>${"&nbsp".repeat(level * 10)}${f.name}`,
        );
        response = this.printFolders(f.folders, level + 1, response);
      });
    return response;
  }

  private deleteFolder(
    actionArgument: String,
    names: String[],
    parentFolder: FolderDirectory,
    index: number = 0,
  ): FolderDirectory | String {
    if (index === names.length) {
      return `Invalid Input: Cannot delete ${names.length}. It doesnt exist`;
    }
    if (index === names.length - 1) {
      const folderToDelete: FolderDirectory = parentFolder.folders.find(
        (f) => f.name === names[index],
      )!;
      parentFolder.folders = parentFolder.folders.filter(
        (f) => f.name !== names[index],
      );
      return folderToDelete;
    }
    const childFound = parentFolder.folders.find(
      (folder) => folder.name === names[index],
    );
    if (!childFound) {
      return (
        "Invalid Input: Cannot delete " +
        actionArgument +
        " - " +
        names[index] +
        " does not exist"
      );
    }
    return this.deleteFolder(actionArgument, names, childFound, index + 1);
  }

  private moveFolder(
    actionArgument: String,
    names: String[],
    parentFolder: FolderDirectory,
    index: number = 0,
    folderToMove: FolderDirectory,
  ): Boolean | String {
    if (index === names.length) {
      parentFolder.folders.push(folderToMove);
      return true;
    }
    const childFound = parentFolder.folders.find(
      (folder) => folder.name === names[index],
    );
    if (!childFound) {
      return false;
    }
    return this.moveFolder(
      actionArgument,
      names,
      childFound,
      index + 1,
      folderToMove,
    );
  }

  /* Non-private methods */
  create(actionArgument: String): String {
    const names = actionArgument.split("/");
    const wasCreated = this.createSubFolder(
      actionArgument,
      names,
      this.initFolder,
    );
    return wasCreated === true
      ? "CREATE " + actionArgument
      : String(wasCreated);
  }

  delete(actionArgument: String): String {
    const names = actionArgument.split("/");
    const wasDeleted: FolderDirectory | String = this.deleteFolder(
      actionArgument,
      names,
      this.initFolder,
    );
    return (wasDeleted as FolderDirectory)?.name !== undefined
      ? "DELETE " + actionArgument
      : String(wasDeleted);
  }

  list(): string {
    return this.printFolders(this.initFolder.folders, 0, "LIST");
  }

  move(actionArgument: String): String {
    const groupArguments = actionArgument.split(" ");
    const argumentToDelete = groupArguments[0];
    const namesToDelete = groupArguments[0].split("/");
    const itemToDelete = this.deleteFolder(
      argumentToDelete,
      namesToDelete,
      this.initFolder,
    );
    if (!itemToDelete) {
      return String(itemToDelete);
    }
    const argumentsToCreate = groupArguments[1];
    const namesToCreate = argumentsToCreate.split("/");
    const wasMoved = this.moveFolder(
      actionArgument,
      namesToCreate,
      this.initFolder,
      0,
      itemToDelete as FolderDirectory,
    );
    if (!wasMoved) {
      return `Invalid Input: the folder ${namesToCreate} does not exist`;
    }
    return `MOVE ${actionArgument}`;
  }

  clearState() {
    this.initFolder.name = "init";
    this.initFolder.folders = [];
  }
}

export default CommandController;
