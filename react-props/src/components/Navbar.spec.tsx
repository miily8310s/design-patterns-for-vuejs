import { render } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("shows logout authenticated is true", () => {
    const { getByText } = render(<Navbar authenticated={true} />);
    getByText("Logout");
  });
  it("shows login by default", () => {
    const { getByText } = render(<Navbar />);
    getByText("Login");
  });
  it("shows login authenticated is false", () => {
    const { getByText } = render(<Navbar authenticated={false} />);
    getByText("Login");
  });
});
