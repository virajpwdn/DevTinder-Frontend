import Profile from "../components/Profile";
import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Provider } from "react-redux";
import appStore from "../store/appStore";
import { data as MOCK_DATA } from "./mock-data/edit.mock";
import { BrowserRouter } from "react-router";

describe("Edit Page", () => {
  // 1 - Render 
  // 2 - Query 
  // 3 - Expect
  it("should render edit page", () => {
    const mockStore = {
      ...appStore,
      getState: () => ({
        ...appStore.getState(),
        user: MOCK_DATA,
      }),
    };
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Profile />
        </Provider>
      </BrowserRouter>,
    );
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveValue("Harvey");
  });
});
