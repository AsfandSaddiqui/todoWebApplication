import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "../Todo";

/**
 * Unit Testing
 * Test the each part of component
 **/

it("should display todo text", () => {
  const { getByRole } = render(<Todo todo={"i am test 1"} />);
  const listEl = getByRole("listitem");
  expect(listEl.textContent).toBe("i am test 1");
});

it("should be visible to users ", () => {
  const { getByRole } = render(<Todo todo={"i am test 1"} />);
  const listEl = getByRole("listitem");
  expect(listEl.textContent).toBeVisible;
});

it("should display check icon on hover", () => {
  const { getByRole, getByTestId } = render(<Todo todo={"i am test 1"} />);
  const listEl = getByRole("listitem");
  const btnEl = getByTestId("icon");
  userEvent.hover(listEl);
  expect(btnEl).toBeVisible;
});
