import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";

export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: (state = initialState.user) => state,
    },
    preloadedState: initialState,
    // PreloadedState is the initial state that you want redux to have. Its like importing data from database before app launch.
  });
};

export const renderWithProviders = (
  component,
  { store = createMockStore(), ...options } = {}
) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <Provider store={store}>
        {children}
      </Provider>
    </BrowserRouter>
  );

  return render(component, { wrapper: Wrapper, ...options });
};
