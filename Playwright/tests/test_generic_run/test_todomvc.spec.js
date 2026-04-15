// TodoMVC pattern showcase — baseTest+sweep on a real public SPA.
// Demonstrates: BasePOM extension, sweep passive-parallel, multi-step CRUD with
// state carryover across DOM mutations and route changes.
//
// Target: https://demo.playwright.dev/todomvc

const { expect } = require("@playwright/test");
const { baseTest } = require("../../base/baseTest");
const { TodoPage } = require("./todo_page");

baseTest.describe.serial("TodoMVC - smoke @smoke @todo", () => {
  baseTest("Landing page renders title and input", async ({ page, sweep }, testInfo) => {
    const todo = new TodoPage(page);
    testInfo._pomClass = TodoPage;
    await todo.goto();
    sweep();

    await expect(todo.locators.todoTitle()).toBeVisible();
    await expect(todo.locators.newTodoInput()).toBeVisible();
  });
});

baseTest.describe.serial("TodoMVC - multi-step CRUD with state carryover @e2e @todo", () => {
  baseTest.slow();

  baseTest(
    "Add three todos, complete one, filter active, clear completed",
    async ({ page, sweep }, testInfo) => {
      const todo = new TodoPage(page);
      testInfo._pomClass = TodoPage;
      await todo.goto();
      sweep();

      // Step 1: create state — three items accumulate
      await todo.addTodo("write tests");
      await todo.addTodo("review PR");
      await todo.addTodo("ship feature");
      await expect(todo.locators.todoItems()).toHaveCount(3);

      // Step 2: mutate state — toggle one complete
      await todo.toggleTodo("review PR");
      await expect(todo.locators.todoCount()).toContainText("2 items left");

      // Step 3: filter route — exercises navigation while preserving items
      await todo.locators.filterActive().click();
      await expect(todo.locators.todoItems()).toHaveCount(2);

      // Step 4: clear completed — final mutation, verify post-state
      await todo.locators.filterAll().click();
      await todo.locators.clearCompleted().click();
      await expect(todo.locators.todoItems()).toHaveCount(2);
    }
  );
});
