interface WeightLimit {
  min: number;
  max: number;
}

interface PatientForm {
  name: string;
  weight: {
    value: string;
    units: string;
  };
}

interface ValidationResult {
  valid: boolean;
  message?: string;
}

interface PatientFormValidity {
  nameFormResult: ValidationResult;
  weightFormResult: ValidationResult;
}

const limits: { [key: string]: WeightLimit } = {
  kg: { min: 30, max: 200 },
  lb: { min: 66, max: 440 },
};

// 引数で与えられた値が不正ではないかチェック
export const isValidValue = (value?: string) => {
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
  value: string | undefined,
  { constraints }: { constraints: WeightLimit }
) => {
  const result = isValidValue(value?.toString());
  if (!result.valid) {
    return result;
  }

  return isWeightBetween(parseInt(value!), constraints);
};

// フォームに入力した内容が不正でないかのチェック
export const isFormValid = (patientForm: PatientFormValidity) => {
  const { nameFormResult, weightFormResult } = patientForm;
  return nameFormResult.valid && weightFormResult.valid;
};

// フォームに入力した内容のチェック結果をオブジェクトで返す
export const getPatientFormResult = (patientForm: PatientForm) => {
  const nameFormResult = isValidValue(patientForm.name);
  const weightFormResult = validateMeasurement(patientForm.weight.value, {
    constraints: limits[patientForm.weight.units],
  });
  return {
    nameFormResult,
    weightFormResult,
  };
};
