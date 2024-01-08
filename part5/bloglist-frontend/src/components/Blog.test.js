import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  const blog = {
    id: "1",
    title: "John Cena is a beast",
    author: "John Doe",
    url: "gg.com",
    likes: 3,
    user: {
      id: "2",
      username: "jonny",
    },
  };
  test("render Blog", async () => {
    const mockHandleLike = jest.fn();
    const mockHandleRemove = jest.fn();

    render(
      <Blog
        blog={blog}
        onLike={mockHandleLike}
        onRemove={mockHandleRemove}
      ></Blog>
    );
    const element = await screen.findByText("John Cena is a beast");
    screen.debug(element);
    expect(element).toBeDefined();
  });

  test("blog like button and url button visible", async () => {
    const mockHandleLike = jest.fn();
    const mockHandleRemove = jest.fn();

    const container = render(
      <Blog
        blog={blog}
        onLike={mockHandleLike}
        onRemove={mockHandleRemove}
      ></Blog>
    ).container;

    const user = userEvent.setup();
    // expands screen by clicking view button
    const viewButton = screen.getByText("view");
    // another way to be use container and get the button directly through it's class or id
    await user.click(viewButton);
    // clicks on like button
    const likeButton = screen.getByText("like");
    const likesView = container.querySelector("#likesView");
    const urlView = container.querySelector("#urlView");
    screen.debug(likesView);

    expect(likesView).toBeDefined();
    expect(urlView).toBeDefined();

    expect(likesView.textContent).toBe("likes 3");
    expect(urlView.textContent).toBe("gg.com");
  });

  test("blog like button and url button not visible", async () => {
    const mockHandleLike = jest.fn();
    const mockHandleRemove = jest.fn();

    const container = render(
      <Blog
        blog={blog}
        onLike={mockHandleLike}
        onRemove={mockHandleRemove}
      ></Blog>
    ).container;

    const likesView = container.querySelector("#likesView");
    const urlView = container.querySelector("#urlView");
    screen.debug(likesView);

    // using toBeDefined also passes because null is considered as a defined value in js
    expect(likesView).not.toBeNull();
    expect(urlView).toBeNull();
  });

  test("like button clicked twice", async () => {
    const mockHandleLike = jest.fn();
    const mockHandleRemove = jest.fn();

    const container = render(
      <Blog
        blog={blog}
        onLike={mockHandleLike}
        onRemove={mockHandleRemove}
      ></Blog>
    ).container;

    const user = userEvent.setup();
    const viewButton = container.querySelector("#viewButton");
    await user.click(viewButton);
    const likesButton = container.querySelector("#likesButton");
    await user.click(likesButton);
    await user.click(likesButton);
    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });
});
