import { describe, it, beforeEach, expect, jest } from "@jest/globals";
import Service from "../src/service";
import fs from "node:fs/promises";
import crypto from "node:crypto";

describe("Service Test Suite", () => {
  let _service;
  const filename = "testfile.ndjson";
  const MOCKED_HASH_PWD = "hashed_password";

  describe("#create - spies", () => {
    beforeEach(() => {
      jest.spyOn(crypto, "createHash").mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD),
      });

      jest.spyOn(fs, "appendFile").mockResolvedValue();

      _service = new Service({
        filename,
      });
    });

    it("should call appendFile with right params", async () => {
      const input = {
        username: "user1",
        password: "pass1",
      };
      const expectedCreatedAt = new Date().toISOString();

      jest
        .spyOn(Date.prototype, "toISOString")
        .mockReturnValue(expectedCreatedAt);

      await _service.create(input);

      expect(crypto.createHash).toHaveBeenCalledTimes(1);
      expect(crypto.createHash).toHaveBeenCalledWith("sha256");

      const hash = crypto.createHash("sha256");
      expect(hash.update).toHaveBeenCalledWith(input.password);
      expect(hash.digest).toHaveBeenCalledWith("hex");

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: MOCKED_HASH_PWD,
      }).concat("\n");

      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);
    });
  });
});
