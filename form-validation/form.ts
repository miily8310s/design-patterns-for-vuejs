interface WeightLimit {
  min: number;
  max: number;
}

const limits = {
  kg: { min: 30, max: 200 },
  lb: { min: 66, max: 440 },
};

// 体重の値が正しく与えられているか
export const isValidWeight = (value?: number | undefined) => {
  if (!value) {
    return {
      valid: false,
      message: "Required",
    };
  }
  return { valid: true };
};

// 与えられた体重が最大値・最小値の間か
export const isWeightBetween = (value: number, { min, max }: WeightLimit) => {
  if (value < min || value > max) {
    return {
      valid: false,
      message: `Must be between ${min} and ${max}`,
    };
  }
  return { valid: true };
};

// 与えられた体重がisValidWeight/isWeightBetweenどちらも満たしているか
export const validateMeasurement = (
  value: number | undefined,
  { constraints }: { constraints: WeightLimit }
) => {
  const result = isValidWeight(value);
  if (!result.valid) {
    return result;
  }

  return isWeightBetween(value!, constraints);
};
