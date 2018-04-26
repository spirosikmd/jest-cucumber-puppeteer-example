const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./test/features/manage-todo.feature");

const PAGE = "http://todomvc.com/examples/react/#/";
const INPUT_SELECTOR = "section input";
const TODO_SELECTOR = "ul.todo-list li label";

defineFeature(feature, test => {
  beforeAll(async () => {
    await page.goto(PAGE);
  });

  test("Add todo", ({ given, when, then }) => {
    let newTodo;

    given(/^I have a todo (.*)$/, todo => {
      newTodo = todo;
    });

    when("I write the todo in the input field", async () => {
      await expect(page).toFill(INPUT_SELECTOR, newTodo);
    });

    when("I click enter", async () => {
      const inputElement = await expect(page).toMatchElement(INPUT_SELECTOR);
      inputElement.press("Enter");
    });

    then("I expect to see the todo in the list", async () => {
      await expect(page).toMatchElement(TODO_SELECTOR, { text: newTodo });
    });
  });
});
