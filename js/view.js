export class TodoView {
  constructor() {
    this.todoBarSection = document.querySelector('.todo-bar')
    this.totalCounter = document.querySelector('[data-js-todo-total-tasks-counter]')
    this.completedCounter = document.querySelector('[data-js-todo-completed-tasks-counter]')
    this.todosSection = document.querySelector('.todos')
    this.listElement = document.querySelector('[data-js-todo-list]')
    this.emptySection = document.querySelector('[data-js-todo-empty-message]')
    this.taskTemplate = document.querySelector('[data-js-todo-item-template]')
  }

  update(displayedTasks, allTasks) {
    this.totalCounter.textContent = allTasks.length
    this.completedCounter.textContent = allTasks.filter(task => task.completed).length

    this.listElement.innerHTML = ''

    if (allTasks.length === 0) {
      this.emptySection.classList.add('is-visible')
      this.todosSection.classList.add('is-hidden')
      this.todoBarSection.classList.add('is-hidden')
    } else {
      this.emptySection.classList.remove('is-visible')
      this.todosSection.classList.remove('is-hidden')
      this.todoBarSection.classList.remove('is-hidden')
    }

    if (displayedTasks.length === 0) {
      this.listElement.classList.add('is-hidden')
      this.emptySection.classList.add('is-visible')
    } else {
      this.listElement.classList.remove('is-hidden')
      this.emptySection.classList.remove('is-visible')
    }

    displayedTasks.forEach(task => {
      const item = this.createTaskElement(task)
      this.listElement.prepend(item)
    })
  }

  createTaskElement(taskData) {
    const taskElement = this.taskTemplate.content.cloneNode(true)

    const item = taskElement.querySelector('[data-js-todo-item]')
    const checkbox = taskElement.querySelector('[data-js-todo-item-checkbox]')
    const label = taskElement.querySelector('[data-js-todo-item-label]')

    item.dataset.id = taskData.id
    checkbox.checked = taskData.completed
    label.textContent = taskData.title
    label.setAttribute('for', taskData.id)
    checkbox.id = taskData.id

    return taskElement
  }
}
