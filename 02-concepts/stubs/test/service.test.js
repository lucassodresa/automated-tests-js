import { describe, it, beforeEach, expect, jest } from "@jest/globals";
import Service from "../src/service";
import fs from "node:fs/promises";
import fsSync from "node:fs";

describe("Service Test Suite", () => {
  let _service;
  const filename = "testfile.ndjson";

  beforeEach(() => {
    _service = new Service({
      filename,
    });
  });

  describe("#read", () => {
    beforeEach(() => {
      jest.spyOn(fsSync, "existsSync").mockReturnValue(true);
    });

    it("should throws an error if file not exist", async () => {
      jest.spyOn(fsSync, "existsSync").mockReturnValue(false);

      // jest
      //   .spyOn(fs, "readFile")
      //   .mockRejectedValue(
      //     `ENOENT: no such file or directory, open '${filename}'`
      //   );

      const result = await _service.read();

      expect(result).toEqual([]);
    });

    it("should return an empty array if the file empty", async () => {
      jest.spyOn(fs, "readFile").mockResolvedValue("");

      const result = await _service.read();
      expect(result).toEqual([]);
    });

    it("should return users without password if file contains users", async () => {
      const dbData = [
        {
          username: "user1",
          password: "pass1",
          createdAt: new Date().toISOString(),
        },
        {
          username: "user2",
          password: "pass2",
          createdAt: new Date().toISOString(),
        },
      ];

      const fileContents = dbData
        .map((item) => JSON.stringify(item).concat("\n"))
        .join("");

      jest.spyOn(fs, "readFile").mockResolvedValue(fileContents);

      const result = await _service.read();

      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }));
      expect(result).toEqual(expected);
    });
  });
});
