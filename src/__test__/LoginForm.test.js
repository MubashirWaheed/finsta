import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { signInWithEmailAndPassword } from "firebase/auth";

test("valid credentials should redirect to home page", async () => {
  const setUser = undefined;
  jest.mock("../firebase");
  const auth = jest.fn();
  jest.mock("firebase/auth", () => ({
    signInWithEmailAndPassword: Promise.resolve({ user: "ok" }),
  }));

  //   await act(async () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ setUser }}>
        <LoginForm setError={false} />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  let emailField = screen.getByLabelText("Email");
  expect(emailField).toBeInTheDocument();
  userEvent.type(emailField, "mubashir@gmail.com");
  await waitFor(() => {
    expect(emailField).toHaveValue("mubashir@gmail.com");
  });

  let passwordField = screen.getByLabelText("Password");
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, "123456");
  await waitFor(() => {
    expect(passwordField).toHaveValue("123456");
  });
  let loginBtn = screen.getByRole("button", { name: "Log In" });
  //   screen.debug();
  userEvent.click(loginBtn);
  //   how ot check is user logged in
  //    understand how mock the firebase login call
  await waitFor(() => {
    expect(
      signInWithEmailAndPassword(auth, "m@gmail.com", "123456")
    ).toHaveBeenCalledTimes(1);
  });

  //   });
});
