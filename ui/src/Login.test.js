import { render, screen } from '@testing-library/react';
import AuthWrapper, {AuthState} from "./AuthWrapper";
import React from "react";
import Header from "./Header";
import App from "./App";

test('renders please login', () => {
  render(
      <React.StrictMode>
        <AuthState>
          <Header/>
          <AuthWrapper>
            <App />
          </AuthWrapper>
        </AuthState>
      </React.StrictMode>
  );
  const linkElement = screen.getByText(/Please login/i);
  expect(linkElement).toBeInTheDocument();
});
