import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EditPage from "../components/EditPage";
import UserCard from "../components/UserCard";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import appstore from "../store/appStore";
import userEvent from "@testing-library/user-event";
import axios from "axios";

describe("Edit Component", () => {
  const user = userEvent.setup();
  vi.mock("axios");
  const mockedAxios = vi.mocked(axios);
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should be first name input box", async () => {
    render(
      <BrowserRouter>
        <Provider store={appstore}>
          <EditPage />
        </Provider>
      </BrowserRouter>,
    );

    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    expect(firstNameInput).toBeInTheDocument();

    await user.type(firstNameInput, "Apple");

    const previewName = screen.getByText(/apple/i);
    expect(previewName).toBeInTheDocument();
  });

  it("should be age input box", async () => {
    const ageInput = screen.getByPlaceholderText(/age/i);
    expect(ageInput).toBeInTheDocument();

    await user.type(ageInput, "23");
    expect(ageInput).toBeInTheDocument(23);
  });

  it("should redirect to feed page", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { message: "Profile update", data: { firstName: "John", lastName: "justin" } },
    });
    const submitButton = screen.getByRole("button", {
      name: /update profile/i,
    });
    await user.click(submitButton);

    expect(mockedAxios.patch).toHaveBeenCalled(
      expect.stringContaining("/profile/edi"),
      expect.objectContaining({
        firstName: "Ap",
      }),
    //   expect.objectContaining({ withCredientials: true }),
    );
  });

  //   when users enters deta and clicks on submit button check for the api call and data
});
