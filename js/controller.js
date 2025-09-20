export class TodoController {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.model.subscribe(this.view)
    this.initEventListeners()
    this.model.loadFromLocalStorage()
  }

  initEventListeners() {
    const newTaskForm = document.querySelector('[data-js-todo-new-task-form]')
    const newTaskInput = document.querySelector('[data-js-todo-new-task-input]')
    const searchInput = document.querySelector('[data-js-todo-search-task-input]')
    const filterSelect = document.querySelector('[data-js-todo-filter]')
    const newTaskClearButton = document.querySelector('[data-js-todo-new-task-clear]')
    const searchClearButton = document.querySelector('[data-js-todo-search-clear]')
    const deleteAllButton = document.querySelector('[data-js-todo-delete-all-button]')

    newTaskForm.addEventListener('submit', event => {
      event.preventDefault()
      if (newTaskInput.value.trim() !== '') {
        this.model.addTask(newTaskInput.value.trim())
        newTaskInput.value = ''
      }
    })

    searchInput.addEventListener('input', event => {
      this.model.setSearchQuery(event.target.value)
    })

    filterSelect.addEventListener('change', event => {
      this.model.setFilter(event.target.value)
    })

    newTaskClearButton.addEventListener('click', () => {
      newTaskInput.value = ''
      newTaskInput.focus()
    })

    searchClearButton.addEventListener('click', () => {
      searchInput.value = ''
      this.model.setSearchQuery('')
      searchInput.focus()
    })

    this.view.listElement.addEventListener('click', event => {
      const id = event.target.closest('[data-js-todo-item]')?.dataset.id

      if (!id) return

      if (event.target.closest('[data-js-todo-item-delete-button]')) {
        if (this.askUserConfirm('Вы действительно хотите удалить эту задачу?')) {
          this.model.removeTask(id)
        }
      }

      if (event.target.closest('[data-js-todo-item-edit-button]')) {
        const newTitle = this.askUserInput('Изменить задачу:')
        if (newTitle) {
          this.model.updateTask(id, newTitle)
        }
      }

      if (event.target.matches('[data-js-todo-item-checkbox]')) {
        this.model.toggleTask(id)
      }
    })

    deleteAllButton.addEventListener('click', () => {
      if (this.askUserConfirm('Вы действительно хотите удалить все задачи?')) {
        this.model.clearAll()
      }
    })
  }

  askUserConfirm(message) {
    return confirm(message)
  }

  askUserInput(message) {
    return prompt(message)
  }
}
