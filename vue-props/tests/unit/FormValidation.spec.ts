import { render, fireEvent } from "@testing-library/vue";
import FormValidation from "../../src/components/FormValidation.vue";

describe("FormValidation", () => {
  it("fills out form correctly", async () => {
    const { getByLabelText, getByDisplayValue, queryByRole } =
      render(FormValidation);

    await fireEvent.update(getByLabelText("Name"), "lachlan");
    await fireEvent.update(getByDisplayValue("kg"), "lb");
    await fireEvent.update(getByLabelText("Weight"), "150");

    expect(queryByRole("error")).toBe(null);
  });

  it("shows errors for invalid inputs", async () => {
    const { getByLabelText, getByDisplayValue, getAllByRole } =
      render(FormValidation);

    await fireEvent.update(getByLabelText("Name"), "");
    await fireEvent.update(getByLabelText("Weight"), "5");
    await fireEvent.update(getByDisplayValue("kg"), "lb");

    expect(getAllByRole("error")).toHaveLength(2);
  });

  it("emits a submit event with patientForm when valid form submitted", async () => {
    const { getByLabelText, getByDisplayValue, getByText, emitted } =
      render(FormValidation);

    await fireEvent.update(getByLabelText("Name"), "lachlan");
    await fireEvent.update(getByLabelText("Weight"), "150");
    await fireEvent.update(getByDisplayValue("kg"), "lb");
    await fireEvent.click(getByText("Submit"));

    expect(emitted().submit[0]).toEqual([
      {
        patient: {
          name: "lachlan",
          weight: {
            value: 150,
            units: "lb",
          },
        },
      },
    ]);
  });
});
