import { it } from "@jest/globals";

const sum = (a, b) => {
  debugger;
  return a + b;
};

it("sums two values", () => {
  expect(sum(2, 3)).toBe(5);
});
