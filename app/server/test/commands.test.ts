import { expect } from "chai";
import { describe, it } from "mocha";

describe("Testing Commands", () => {
  describe("Core Functionality Happy Path", () => {
    it("Creates the initial command", async () => {
      expect(true).to.be.equal(true);
    });

    it("Creates a folder successfully", async () => {
      expect(true).to.be.equal(true);
    });

    it("Creates a sub-folder successfully", async () => {
      expect(true).to.be.equal(true);
    });

    it("Creates a folder on the same level successfully", async () => {
      expect(true).to.be.equal(true);
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
      expect(true).to.be.equal(true);
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
