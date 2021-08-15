import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import AddTodo from "../AddTodo";

beforeEach(() => {
  render(<AddTodo />);
});

/**
 * Helper Methods
 * These methods get the most frequntly used elements for testing
 * */

const addTask = (task) => {
  const inputEl = screen.getByPlaceholderText("Add your new todo");
  const btnEl = screen.getByTestId("btn");

  task.forEach((el) => {
    fireEvent.change(inputEl, { target: { value: el } });
    fireEvent.click(btnEl);
  });
};

const removeTask = (task) => {
  task.forEach((tsk) => {
    fireEvent.click(tsk);
  });
};

/**
 * Unit Testing
 * Test the each part of component
 **/

describe("Unit Testing of Component", () => {
  it("should be empty by deafult", () => {
    const inputEl = screen.getByTestId("input");
    expect(inputEl.value).toBe("");
  });

  it("should change input value", () => {
    const inputEl = screen.getByTestId("input");
    fireEvent.change(inputEl, {
      target: {
        value: "hello i am test",
      },
    });
    expect(inputEl.value).toBe("hello i am test");
  });

  it("should empty input field after each click", () => {
    const inputEl = screen.getByTestId("input");
    const btnEl = screen.getByTestId("btn");
    fireEvent.change(inputEl, {
      target: {
        value: "hello test1 ",
      },
    });

    fireEvent.click(btnEl);
    expect(inputEl.value).toBe("");
  });
});

/**
 * Integration Testing
 * Test 2 components 'Todo' and 'AddTodo'
 **/

describe("Integration Testing of Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should add value to todo List", () => {
    const inputEl = screen.getByPlaceholderText("Add your new todo");
    const btnEl = screen.getByTestId("btn");
    fireEvent.change(inputEl, {
      target: {
        value: "hello test1",
      },
    });

    fireEvent.click(btnEl);
    const listEl = screen.getByText(/hello test1/i);
    expect(listEl).toBeInTheDocument;
  });

  it("should add multiple value to todo List", () => {
    addTask(["test 1", "test 2", "test 3", "test 4", "test 5"]);
    const listEl = screen.getAllByTestId("btn2");
    expect(listEl.length).toBe(5);
  });

  it("should remove when click on check button", () => {
    const listEl = screen.getAllByTestId("btn2");

    removeTask(listEl);

    expect(listEl.length).toBe(0);
  });
});
