import LoginWithStore from "@/components/LoginWithStore.vue";
import App from "@/App.vue";
import { render, fireEvent } from "@testing-library/vue";
import storeAxios from "@/store";

describe("LoginWithStore", () => {
  it("successfully authenticates", async () => {
    const { getByRole, getByText, findByText } = render(App, {
      store: storeAxios,
    });
    await fireEvent.update(getByRole("username"), "Lachlan");
    await fireEvent.update(getByRole("password"), "secret-password");
    await fireEvent.click(getByText("Click hear to sign in"));
    await findByText("Hello, Lachlan");
  });
});
