import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import CreateForm from "./CreateForm";

describe("<CreateForm />", () => {
  let container;
  const mockhandleCreate = jest.fn();
  const user = userEvent.setup();
  beforeEach(() => {
    container = render(
      <CreateForm onCreate={mockhandleCreate}></CreateForm>
    ).container;
  });

  test("details are sent correctly to onCreate", async () => {
    const inputTitle = screen.getByPlaceholderText("Atomic Habits");
    const inputAuthor = screen.getByPlaceholderText("James Clear");
    const inputUrl = screen.getByPlaceholderText("jamesclear.com");
    const sendButton = screen.getByText("Create");
    // screen.render();

    // type stuff and send
    await userEvent.type(inputTitle, "Doodle");
    await userEvent.type(inputAuthor, "Google");
    await userEvent.type(inputUrl, "google.com");
    await userEvent.click(sendButton);

    // check if handler receives these arguments
    expect(mockhandleCreate.mock.calls[0].length).toBe(3);
    expect(mockhandleCreate.mock.calls[0][0]).toBe("Doodle");
    expect(mockhandleCreate.mock.calls[0][1]).toBe("Google");
    expect(mockhandleCreate.mock.calls[0][2]).toBe("google.com");
  });
});
