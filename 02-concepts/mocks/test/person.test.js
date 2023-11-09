import { describe, it, expect, jest } from "@jest/globals";
import Person from "../src/person";

describe("#Person Suite", () => {
  describe("#validate", () => {
    it("should throw if the name is not present", () => {
      const mockInvalidPerson = {
        name: "",
        taxNumber: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });

    it("should throw if the name is not present", () => {
      const mockInvalidPerson = {
        name: "Lucas",
        taxNumber: "",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("taxNumber is required")
      );
    });

    it("should not throw if person is valid", () => {
      const mockValidPerson = {
        name: "Lucas",
        taxNumber: "123.456.789-00",
      };
      expect(() => Person.validate(mockValidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    it("should format person name and taxNumber", () => {
      const mockPerson = {
        name: "Lucas de Sá",
        taxNumber: "123.456.789-00",
      };

      const formattedPerson = Person.format(mockPerson);

      const expected = {
        name: "Lucas",
        taxNumber: "12345678900",
        lastName: "de Sá",
      };

      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe("#save", () => {
    const mockValidPerson = {
      name: "Lucas",
      taxNumber: "123.456.789-00",
      lastName: "de Sá",
    };
    const getError = (person) =>
      new Error(`cannot save invalid person: ${JSON.stringify(person)}`);

    it("should throw if name is not present", () => {
      const mockPersonWithoutName = { ...mockValidPerson, name: undefined };
      const expectedError = getError(mockPersonWithoutName);
      expect(() => Person.save(mockPersonWithoutName)).toThrow(expectedError);
    });

    it("should throw if taxNumber is not present", () => {
      const mockPersonWithoutName = {
        ...mockValidPerson,
        taxNumber: undefined,
      };
      const expectedError = getError(mockPersonWithoutName);
      expect(() => Person.save(mockPersonWithoutName)).toThrow(expectedError);
    });

    it("should throw if lastName is not present", () => {
      const mockPersonWithoutName = {
        ...mockValidPerson,
        lastName: undefined,
      };
      const expectedError = getError(mockPersonWithoutName);
      expect(() => Person.save(mockPersonWithoutName)).toThrow(expectedError);
    });

    it("should not throw if person has all required porperties", () => {
      const mockPersonWithoutName = {
        ...mockValidPerson,
      };
      const expectedError = getError(mockPersonWithoutName);
      expect(() => Person.save(mockPersonWithoutName)).not.toThrow();
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      const mockPerson = {
        name: "Lucas de Sá",
        taxNumber: "123.456.789-00",
      };
      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        name: "Lucas",
        taxNumber: "12345678900",
        lastName: "de Sá",
      });

      const result = Person.process(mockPerson);
      const expected = "ok";

      expect(result).toStrictEqual(expected);
    });
  });
});
