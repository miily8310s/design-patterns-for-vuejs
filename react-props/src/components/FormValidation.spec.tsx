import { render, fireEvent } from "@testing-library/react";
import { FormValidation } from "./FormValidation";

describe("FormValidation", () => {
  it("fills out form correctly", async () => {
    const { getByLabelText, getByDisplayValue, queryAllByTestId } = render(
      <FormValidation />
    );

    await fireEvent.change(getByLabelText("Name"), {
      target: { value: "lachlan" },
    });
    await fireEvent.change(getByDisplayValue("kg"), "lb");
    await fireEvent.change(getByLabelText("Weight"), {
      target: { value: "150" },
    });

    expect(queryAllByTestId("error")).toHaveLength(0);
  });
  it("shows errors for invalid inputs", async () => {
    const { getByLabelText, getByDisplayValue, queryAllByTestId } = render(
      <FormValidation />
    );

    await fireEvent.change(getByLabelText("Name"), {
      target: { value: "" },
    });
    await fireEvent.change(getByDisplayValue("kg"), "lb");
    await fireEvent.change(getByLabelText("Weight"), {
      target: { value: "5" },
    });

    expect(queryAllByTestId("error")).toHaveLength(2);
  });
});
