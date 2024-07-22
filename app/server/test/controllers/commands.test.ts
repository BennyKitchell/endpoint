import { expect } from "chai";
import { describe, it } from "mocha";
import { beforeEach } from "node:test";
import CommandController from "../src/lib/controller/command.js";

describe("Testing Commands", () => {
  let commandController: CommandController;

  beforeEach(() => {
    commandController = new CommandController();
  });

  describe("Core Functionality Happy Path", () => {
    it("Creates the initial command", async () => {
      expect(true).to.be.equal(true);
    });

    it("Creates a folder successfully", async () => {
      const result = commandController.create("fruits");
      expect(result).to.be.equal("CREATE fruits");
    });

    it("Creates a sub-folder successfully", async () => {
      const result = commandController.create("fruits/apples");
      expect(result).to.be.equal("CREATE fruits/apples");
    });

    it("Creates a folder on the same level successfully", async () => {
      const result = commandController.create("grains");
      expect(result).to.be.equal("CREATE grains");
    });

    it("Deletes a folder successfully", async () => {
      expect(true).to.be.equal(true);
    });

    it("Moves a folder to another successfully", async () => {
      expect(true).to.be.equal(true);
    });
  });
  describe("Core Functionality Sad Path", () => {
    it("Does not create a duplicate folder", async () => {
      const result = commandController.create("grains");
      expect(result).to.be.equal("CREATE grains");
      const duplicateResult = commandController.create("grains");
      expect(duplicateResult).to.be.equal(
        "Invalid Input: Cannot create grains. grains already exists",
      );
    });

    it("Does not execute commands that do not exit", async () => {
      expect(true).to.be.equal(true);
    });

    it("Does not move a folder if the destination is not correct", async () => {
      expect(true).to.be.equal(true);
    });

    it("Handles white space correctly", async () => {
      expect(true).to.be.equal(true);
    });
  });
});
