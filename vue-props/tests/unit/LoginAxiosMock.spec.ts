import LoginAxiosMock from "@/components/LoginAxiosMock.vue";
import { render, fireEvent } from "@testing-library/vue";

const mockPost = jest.fn();
jest.mock("axios", () => ({
  post: (url: string, data: any) => {
    mockPost(url, data);
    return Promise.resolve({
      data: { name: "Lachlan" },
    });
  },
}));

describe("LoginAxiosMock", () => {
  it("successfully authenticates", async () => {
    const { getByRole, getByText, findByText } = render(LoginAxiosMock);
    await fireEvent.update(getByRole("username"), "Lachlan");
    await fireEvent.update(getByRole("password"), "secret-password");
    await fireEvent.click(getByText("Click hear to sign in"));
    expect(mockPost).toHaveBeenCalledWith("/login", {
      username: "Lachlan",
      password: "secret-password",
    });
    await findByText("Hello, Lachlan");
  });
});
