import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { getPatientFormResult, isFormValid } from "../utils/formUtils";

export const FormValidation = () => {
  // const [form, setForm] = useState({
  //   name: "",
  //   weight: {
  //     value: "",
  //     units: "kg",
  //   },
  // });
  const [name, setName] = useState("");
  const [weight, setWeight] = useState({
    value: "",
    units: "kg",
  });

  // useEffect(() => {
  //   return () => {
  //     // setForm({ name, weight });
  //   };
  // }, [name, weight]);

  const validatedForm = getPatientFormResult({
    name,
    weight,
  });
  const valid = isFormValid(validatedForm);

  return (
    <div className="form-wrapper">
      <h3>Patient Data</h3>
      <form
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          // console.log("submit", { patient: form });
        }}
      >
        <div className="field">
          {!validatedForm.nameFormResult.valid ? (
            <div className="error" data-testid="error">
              {validatedForm.nameFormResult.message}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            role="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="field">
          {!validatedForm.weightFormResult.valid ? (
            <div className="error" data-testid="error">
              {validatedForm.weightFormResult.message}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="weight">Weight</label>
          <input
            id="weight"
            role="weight"
            name="weight"
            value={weight.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setWeight({ ...weight, value: e.target.value })
            }
          />
          <select
            id="weight-units"
            role="weight-units"
            value={weight.units}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setWeight({ ...weight, units: e.target.value })
            }
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>
        <div className="field">
          <button role="submit" disabled={!valid}>
            Submit
          </button>
        </div>
      </form>
      <div>
        {/* <pre>
          Patient Data
          {form}
        </pre> */}

        {/* <pre>
          Form State
          {validatedForm}
        </pre> */}
      </div>
    </div>
  );
};
