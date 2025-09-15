export class Task {
  constructor(title) {
    this.id = crypto.randomUUID() ?? Date.now().toString()
    this.title = title
    this.completed = false
  }

  updateTaskTitle(newTitle) {
    this.title = newTitle
  }
}
