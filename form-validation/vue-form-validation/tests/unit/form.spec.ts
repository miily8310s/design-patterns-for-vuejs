import {
  isValidWeight,
  isWeightBetween,
  validateMeasurement,
} from "../../../form";

describe("isValidWeight", () => {
  it("is invalid when undefined", () => {
    expect(isValidWeight(undefined)).toEqual({
      valid: false,
      message: "Required",
    });
  });

  it("returns true when number minus", () => {
    expect(isValidWeight(-1)).toEqual({ valid: true });
  });

  it("returns true when number 0", () => {
    expect(isValidWeight(0)).toEqual({ valid: false, message: "Required" });
  });

  it("returns true when number not 0", () => {
    expect(isValidWeight(1)).toEqual({ valid: true });
  });
});

describe("isWeightBetween", () => {
  const testLimits = { min: 5, max: 10 };
  it("returns true when value is equal to min", () => {
    expect(isWeightBetween(5, testLimits)).toEqual({ valid: true });
  });

  it("returns true when value is between min/max", () => {
    expect(isWeightBetween(7, testLimits)).toEqual({ valid: true });
  });

  it("returns true when value is equal to max", () => {
    expect(isWeightBetween(10, testLimits)).toEqual({ valid: true });
  });

  it("returns false when value is less than min", () => {
    expect(isWeightBetween(4, testLimits)).toEqual({
      valid: false,
      message: "Must be between 5 and 10",
    });
  });

  it("returns false when value is greater than max", () => {
    expect(isWeightBetween(11, testLimits)).toEqual({
      valid: false,
      message: "Must be between 5 and 10",
    });
  });
});

describe("validateMeasurement", () => {
  it("returns invalid for input", () => {
    const constraints = { min: 10, max: 30 };
    const actual = validateMeasurement(undefined, {
      constraints,
    });
    expect(actual).toEqual({ valid: false, message: "Required" });
  });

  it("returns invalid when outside range", () => {
    const constraints = { min: 10, max: 30 };
    const actual = validateMeasurement(40, { constraints });
    expect(actual).toEqual({
      valid: false,
      message: "Must be between 10 and 30",
    });
  });

  it("returns valid when value is in range", () => {
    const constraints = { min: 10, max: 30 };
    const actual = validateMeasurement(20, { constraints });
    expect(actual).toEqual({ valid: true });
  });
});
