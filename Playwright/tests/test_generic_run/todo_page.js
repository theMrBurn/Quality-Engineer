// POM for https://demo.playwright.dev/todomvc — Playwright's official TodoMVC demo
const { BasePOM } = require("../../base/BasePOM");

class TodoPage extends BasePOM {
  static expectedLocators = [
    "todoTitle",
    "newTodoInput",
    "todoItems",
    "todoCount",
    "toggleAll",
    "clearCompleted",
    "filterAll",
    "filterActive",
    "filterCompleted",
  ];

  static fallbacks = {
    newTodoInput: ["input.new-todo"],
    todoTitle: ['h1:has-text("todos")'],
    todoCount: [".todo-count"],
    clearCompleted: ['button:has-text("Clear completed")'],
  };

  constructor(page) {
    super(page);
    this.locators = {
      todoTitle: () => this.page.getByRole("heading", { name: "todos" }),
      newTodoInput: () => this.page.getByPlaceholder("What needs to be done?"),
      todoItems: () => this.page.locator(".todo-list li"),
      todoItemByText: (text) =>
        this.page.locator(".todo-list li").filter({ hasText: text }),
      todoCount: () => this.page.locator(".todo-count"),
      toggleAll: () => this.page.locator(".toggle-all"),
      clearCompleted: () =>
        this.page.getByRole("button", { name: "Clear completed" }),
      filterAll: () => this.page.getByRole("link", { name: "All" }),
      filterActive: () => this.page.getByRole("link", { name: "Active" }),
      filterCompleted: () => this.page.getByRole("link", { name: "Completed" }),
    };
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("load");
  }

  async addTodo(text) {
    await this.locators.newTodoInput().fill(text);
    await this.locators.newTodoInput().press("Enter");
  }

  async toggleTodo(text) {
    await this.locators.todoItemByText(text).getByRole("checkbox").check();
  }

  async deleteTodo(text) {
    const item = this.locators.todoItemByText(text);
    await item.hover();
    await item.locator(".destroy").click();
  }
}

module.exports = { TodoPage };
