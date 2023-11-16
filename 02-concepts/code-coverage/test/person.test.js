import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { mapPerson } from "../src/person.js";

describe("Person Test Suite", () => {
  describe("happy path", () => {
    it("should map person", () => {
      const personStr = '{ "name": "lucassa", "age": 24 }';
      const personObj = mapPerson(personStr);

      expect(personObj).toEqual({
        name: "lucassa",
        age: 24,
        createdAt: expect.any(Date),
      });
    });
  });

  describe("sad path", () => {
    it("should not map person given invalid JSON string", () => {
      const personStr = '{ "name": ';

      expect(() => mapPerson(personStr)).toThrow(
        "Unexpected end of JSON input"
      );
    });

    it("should not map person given invalid JSON data", () => {
      const personStr = "{}";

      const personObj = mapPerson(personStr);

      expect(personObj).toEqual({
        name: "lucassa",
        age: 24,
        createdAt: expect.any(Date),
      });
    });
  });
});
