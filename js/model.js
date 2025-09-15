import { Task } from './task.js'

export class TodoModel {
  constructor() {
    this.tasks = []
    this.observers = []
    this.filter = 'all'
    this.searchQuery = ''
  }

  setFilter(filter) {
    this.filter = filter
    this.notify()
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase()
    this.notify()
  }

  addTask(title) {
    const task = new Task(title)
    this.tasks.push(task)
    this.sync()
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id)
    this.sync()
  }

  toggleTask(id) {
    const task = this.tasks.find(task => task.id === id)
    if (task) task.completed = !task.completed
    this.sync()
  }

  updateTask(id, newTitle) {
    const task = this.tasks.find(task => task.id === id)
    if (task) task.updateTaskTitle(newTitle)
    this.sync()
  }

  clearAll() {
    this.tasks = []
    this.sync()
  }

  getTasksByFilter() {
    return this.tasks.filter(task => {
      if (this.filter === 'active') return !task.completed
      if (this.filter === 'completed') return task.completed
      return true
    })
  }

  getVisibleTasks() {
    return this.getTasksByFilter().filter(task => {
      return task.title.toLowerCase().includes(this.searchQuery)
    })
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  notify() {
    const displayedTasks = this.getVisibleTasks()
    this.observers.forEach(observer => observer.update(displayedTasks, this.tasks))
  }

  saveToLocalStorage() {
    localStorage.setItem('todo-tasks', JSON.stringify(this.tasks))
  }

  loadFromLocalStorage() {
    const rawData = localStorage.getItem(`todo-tasks`)

    if (!rawData) {
      this.tasks = []
      return
    }

    try {
      const parsedData = JSON.parse(rawData)

      this.tasks = Array.isArray(parsedData)
        ? parsedData.map(task => Object.assign(new Task(task.title), task))
        : []
    } catch (error) {
      console.error('Ошибка извлечения данных:', error)
      this.tasks = []
    }

    this.notify()
  }

  sync() {
    this.saveToLocalStorage()
    this.notify()
  }
}
