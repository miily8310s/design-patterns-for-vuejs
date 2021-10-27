import { render } from "@testing-library/vue";
import Navbar from "../../src/components/Navbar.vue";

describe("Navbar", () => {
  const renderNavbar = (props?: { authenticated: boolean }) => {
    return render(Navbar, { props });
  };
  it("shows logout authenticated is true", () => {
    const { getByText } = renderNavbar({ authenticated: true });
    getByText("Logout");
  });
  it("shows login by default", () => {
    const { getByText } = renderNavbar();
    getByText("Login");
  });
  it("shows login authenticated is false", () => {
    const { getByText } = renderNavbar({ authenticated: false });
    getByText("Login");
  });
});
