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

  delete() {}
  move() {}
  list(): string {
    return this.printFolders(this.initFolder.folders, 0, "LIST");
  }
}

export default CommandController;
