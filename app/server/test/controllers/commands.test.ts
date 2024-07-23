import { expect } from "chai";
import { describe, it, beforeEach } from "mocha";
import CommandController from "../../src/lib/controller/command.js";

describe("Testing Commands", () => {
  let commandController: CommandController;

  beforeEach(() => {
    commandController = new CommandController();
  });

  describe("Core Functionality Happy Path", () => {
    it("Creates the initial command", async () => {
      const result = commandController.list();
      expect(result).to.be.equal("LIST");
    });

    it("Creates a folder successfully", async () => {
      const result = commandController.create("fruits");
      const resultList = commandController.list();

      expect(result).to.be.equal("CREATE fruits");
      expect(resultList).to.be.equal("LIST<br>fruits");
    });

    it("Creates a sub-folder successfully", async () => {
      const result = commandController.create("fruits/apples");
      const resultList = commandController.list();

      expect(result).to.be.equal("CREATE fruits/apples");
      expect(resultList).to.be.equal(
        "LIST<br>fruits<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspapples",
      );
    });

    it("Creates a folder on the same level successfully", async () => {
      const result = commandController.create("grains");
      const resultList = commandController.list();

      expect(result).to.be.equal("CREATE grains");
      expect(resultList).to.be.equal(
        "LIST<br>fruits<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspapples<br>grains",
      );
    });

    it("Deletes a folder successfully", async () => {
      const result = commandController.delete("fruits/apples");
      expect(result).to.be.equal("DELETE fruits/apples");

      const resultList = commandController.list();
      expect(resultList).to.be.equal("LIST<br>fruits<br>grains");
    });

    it("Moves a folder to another successfully", async () => {
      const result = commandController.move("fruits grains");
      expect(result).to.be.equal("MOVE fruits grains");

      const resultList = commandController.list();
      expect(resultList).to.be.equal(
        "LIST<br>grains<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspfruits",
      );
    });
  });
  describe("Core Functionality Sad Path", () => {
    it("Does not create a duplicate folder", async () => {
      const result = commandController.create("dairy");
      expect(result).to.be.equal("CREATE dairy");
      const duplicateResult = commandController.create("dairy");
      expect(duplicateResult).to.be.equal(
        "Invalid Input: Cannot create dairy. dairy already exists",
      );
    });

    it("Does not move a folder if the destination does not exist", async () => {
      const result = commandController.move("fruits fake");
      expect(result).to.be.equal(
        "Invalid Input: the folder dairy does not exist",
      );
    });
  });
});
