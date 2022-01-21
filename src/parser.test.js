const parser = require("./parser")();
const fs = require("fs");

describe("Parser", () => {
  it("should create parser", () => expect(parser).toBeDefined());
  it("should return null on empty input", () => {
    expect(parser.parse("")).toEqual(null);
  });
  it("should return null on invalid input 1", () => {
    const result = parser.parse("Package");
    expect(result).toEqual(null);
  });
  it("should return null on invalid input 2", () => {
    const result = parser.parse("Package\n");
    expect(result).toEqual(null);
  });
  it("should return null on invalid input 3", () => {
    const result = parser.parse("\nPackage\nliibalaaba\n");
    expect(result).toEqual(null);
  });
  it("should return result on valid input", () => {
    const result = parser.parse(`Package  Current  Wanted  Latest  Location
    pkg   1.0.0  1.0.0   3.0.0  module`);
    expect(result).toEqual({
      pkg: {
        current: "1.0.0",
        wanted: "1.0.0",
        latest: "3.0.0",
      },
    });
  });
  it("should return result on valid v16 input", () => {
    const result = parser.parse(`Package  Current  Wanted  Latest  Location             Depended by
    pkg   1.0.0  1.0.0   3.0.0  module     module`);
    expect(result).toEqual({
      pkg: {
        current: "1.0.0",
        wanted: "1.0.0",
        latest: "3.0.0",
      },
    });
  });
  it("should skip if latest is less than current", () => {
    const result = parser.parse(`Package  Current  Wanted  Latest  Location
    pkg   3.0.1  3.0.1   1.0.1  module`);
    expect(result).toEqual(null);
  });
});
