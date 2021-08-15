import { screen, render, fireEvent } from "@testing-library/react";
import Todo from "../Todo";

beforeEach(() => {
  render(<Todo todo={"i am test 1"} />);
});

it("should display todo text", () => {
  const listEl = screen.getByTestId("title");
  expect(listEl.textContent).toBe("i am test 1");
});

it("should be visible to users ", () => {
  const listEl = screen.getByRole("listitem");
  expect(listEl.textContent).toBeVisible;
});

it("should display check icon on hover", () => {
  const listEl = screen.getByRole("listitem");
  const spanEl = screen.getByTestId("icon");
  fireEvent.mouseOver(listEl);
  expect(spanEl).toBeVisible;
});
