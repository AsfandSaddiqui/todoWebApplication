import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodo from "../AddTodo";

const cleanLocalStorage = () => {
  localStorage.setItem("list", JSON.stringify([]));
};

/**
 * Unit Testing
 * Test the each part of component
 **/

describe("Unit Testing of Component", () => {
  it("should be empty by deafult", () => {
    const { getByPlaceholderText } = render(<AddTodo />);
    const inputEl = getByPlaceholderText("Add your new todo");
    expect(inputEl.value).toBe("");
  });

  it("should change input value", () => {
    const { getByPlaceholderText } = render(<AddTodo />);
    const inputEl = getByPlaceholderText("Add your new todo");
    userEvent.type(inputEl, "hello i am test");
    expect(inputEl.value).toBe("hello i am test");
  });

  it("should empty input field after each click", () => {
    const { getByTestId, getByPlaceholderText } = render(<AddTodo />);
    const inputEl = getByPlaceholderText("Add your new todo");
    const btnEl = getByTestId("add_btn");
    userEvent.type(inputEl, "hello test1 ");

    userEvent.click(btnEl);
    expect(inputEl.value).toBe("");
    cleanLocalStorage();
  });
});

/**
 * Integration Testing
 * Test 2 components 'Todo' and 'AddTodo'
 **/

describe("Integration Testing of components", () => {
  it("should add value to todo List", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <AddTodo />
    );
    const inputEl = getByPlaceholderText("Add your new todo");
    const btnEl = getByTestId("add_btn");
    userEvent.type(inputEl, "hello test");

    userEvent.click(btnEl);
    const listEl = getByText(/hello test/i);

    expect(listEl).toBeInTheDocument;
    cleanLocalStorage();
  });

  it("should add multiple value to todo List", () => {
    const { getAllByTestId, getByPlaceholderText, getByTestId } = render(
      <AddTodo />
    );
    const task = ["test 1", "test 2", "test 3", "test 4", "test 5"];

    const inputEl = getByPlaceholderText("Add your new todo");
    const btnEl = getByTestId("add_btn");

    task.forEach((el) => {
      userEvent.type(inputEl, el);
      userEvent.click(btnEl);
    });

    const listEl = getAllByTestId("icon");
    expect(listEl.length).toBe(5);
    cleanLocalStorage();
  });

  it("should remove multiple todo when click on check button", () => {
    const { getAllByTestId, getByPlaceholderText, getByTestId } = render(
      <AddTodo />
    );

    const task = ["test 1", "test 2", "test 3", "test 4", "test 5"];

    const inputEl = getByPlaceholderText("Add your new todo");
    const btnEl = getByTestId("add_btn");

    task.forEach((task) => {
      userEvent.type(inputEl, task);
      userEvent.click(btnEl);
    });
    const todos = getAllByTestId("icon");
    expect(todos.length).toBe(5);

    todos.forEach((todo) => {
      userEvent.click(todo);
    });

    expect(todos).not.toBeInTheDocument;
  });
});
