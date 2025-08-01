class Todo {
  constructor(data, selector, todoCounter) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._todoCounter = todoCounter;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoCounter.updateTotal(false);
      if (this._data.completed) {
        this._todoCounter.updateCompleted(false);
      }
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      if (this._data.completed) {
        this._todoCounter.updateCompleted(true);
      } else {
        this._todoCounter.updateCompleted(false);
      }
    });
  }

  _setDates() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    this._setDates();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
