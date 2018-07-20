const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./test/features/manage-todo-list.feature");

const PAGE = "http://todomvc.com/examples/react/#/";
const ENTER_EVENT = "Enter";
const INPUT_SELECTOR = "section input";
const TODO_ITEMS_SELECTOR = "ul.todo-list li";
const todoItemSelector = index => `ul.todo-list li:nth-child(${index})`;
const todoItemLabelSelector = index => `${todoItemSelector(index)} label`;
const deleteButtonSelector = index => `${todoItemSelector(index)} button`;

async function addTodoItem(label) {
  await expect(page).toFill(INPUT_SELECTOR, label);
  const inputElement = await expect(page).toMatchElement(INPUT_SELECTOR);
  inputElement.press(ENTER_EVENT);
}

async function deleteTodoItem(index) {
  const todoItemElement = await expect(page).toMatchElement(
    todoItemSelector(index)
  );
  await todoItemElement.hover();
  await expect(page).toClick(deleteButtonSelector(index));
}

defineFeature(feature, test => {
  let todoList;

  beforeEach(async () => {
    await page.goto(PAGE);
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    todoList = [];
  });

  const givenIHaveTheTodoList = given => {
    given("I have the todo list", async table => {
      todoList = table;
      for (let index = 0; index < table.length; index++) {
        await addTodoItem(table[index].Label);
      }
    });
  };

  const thenIExpectTheTodoListToHaveNumberOfItems = then => {
    then(/^I expect the todo list to have (\d+) items?$/, async number => {
      const todoItemCount = await page.$$eval(
        TODO_ITEMS_SELECTOR,
        items => items.length
      );
      expect(todoItemCount).toBe(parseInt(number));
    });
  };

  test("Add todo item", ({ given, when, then }) => {
    givenIHaveTheTodoList(given);

    when(/^I write the todo item "(.*)" in the input field$/, async label => {
      await expect(page).toFill(INPUT_SELECTOR, label);
    });

    when("I press enter", async () => {
      const inputElement = await expect(page).toMatchElement(INPUT_SELECTOR);
      inputElement.press(ENTER_EVENT);
    });

    thenIExpectTheTodoListToHaveNumberOfItems(then);

    then(
      /^I expect to see the todo item "(.*)" in the todo list$/,
      async label => {
        await expect(page).toMatchElement(todoItemLabelSelector(2), {
          text: label
        });
      }
    );
  });

  test("Delete todo item", ({ given, when, then }) => {
    givenIHaveTheTodoList(given);

    when(/^I press the delete button of the todo item "(.*)"$/, async label => {
      const index = todoList.findIndex(todoItem => todoItem.Label === label);
      await deleteTodoItem(index + 1);
    });

    thenIExpectTheTodoListToHaveNumberOfItems(then);

    then(
      /^I expect to not see the todo item "(.*)" in the todo list$/,
      async label => {
        await expect(page).not.toMatchElement(todoItemLabelSelector(1), {
          text: label
        });
      }
    );
  });
});
