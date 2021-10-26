import { render } from "@testing-library/vue";
import Navbar from "../../src/components/Navbar.vue";

describe("Navbar", () => {
  it("shows logout authenticated is true", () => {
    const { getByText } = render(Navbar, {
      props: {
        authenticated: true,
      },
    });
    getByText("Logout");
  });
  it("shows login by default", () => {
    const { getByText } = render(Navbar);
    getByText("Login");
  });
  it("shows login authenticated is false", () => {
    const { getByText } = render(Navbar, {
      props: {
        authenticated: false,
      },
    });
    getByText("Login");
  });
});
