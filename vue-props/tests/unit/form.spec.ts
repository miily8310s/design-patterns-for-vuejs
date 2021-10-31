import {
  isFormValid,
  isValidValue,
  isWeightBetween,
  validateMeasurement,
  getPatientFormResult,
} from "@/form";

describe("isValidWeight", () => {
  it("is invalid when undefined", () => {
    expect(isValidValue(undefined)).toEqual({
      valid: false,
      message: "Required",
    });
  });

  it("returns true when empty string", () => {
    expect(isValidValue("")).toEqual({ valid: false, message: "Required" });
  });

  it("returns true when not empty string", () => {
    expect(isValidValue("some value")).toEqual({ valid: true });
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
    const actual = validateMeasurement("40", { constraints });
    expect(actual).toEqual({
      valid: false,
      message: "Must be between 10 and 30",
    });
  });

  it("returns valid when value is in range", () => {
    const constraints = { min: 10, max: 30 };
    const actual = validateMeasurement("20", { constraints });
    expect(actual).toEqual({ valid: true });
  });
});

describe("isFormValid", () => {
  it("returns true when name and weight field are valid", () => {
    const validForm = {
      nameFormResult: { valid: true },
      weightFormResult: { valid: true },
    };
    expect(isFormValid(validForm)).toEqual(true);
  });

  it("returns false when form field is invalid", () => {
    const inValidForm = {
      nameFormResult: { valid: false },
      weightFormResult: { valid: true },
    };
    expect(isFormValid(inValidForm)).toEqual(false);
  });
});

describe("getPatientFormResult", () => {
  const validPatient = {
    name: "test patient",
    weight: { value: "200", units: "kg" },
  };

  it("is valid when form is filled out correctly", () => {
    const form = getPatientFormResult(validPatient);
    expect(form.nameFormResult).toEqual({ valid: true });
    expect(form.weightFormResult).toEqual({ valid: true });
  });

  it("is invalid when name is empty", () => {
    const form = getPatientFormResult({ ...validPatient, name: "" });
    expect(form.nameFormResult).toEqual({ valid: false, message: "Required" });
    expect(form.weightFormResult).toEqual({ valid: true });
  });

  it("is invalid when weight under limit", () => {
    const form = getPatientFormResult({
      ...validPatient,
      weight: { value: "65", units: "lb" },
    });
    expect(form.nameFormResult).toEqual({ valid: true });
    expect(form.weightFormResult).toEqual({
      valid: false,
      message: "Must be between 66 and 440",
    });
  });

  it("is invalid when weight under limit", () => {
    const form = getPatientFormResult({
      ...validPatient,
      weight: { value: "201", units: "kg" },
    });
    expect(form.nameFormResult).toEqual({ valid: true });
    expect(form.weightFormResult).toEqual({
      valid: false,
      message: "Must be between 30 and 200",
    });
  });
});
