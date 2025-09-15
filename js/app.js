import { TodoModel } from './model.js'
import { TodoView } from './view.js'
import { TodoController } from './controller.js'
import { ThemeController } from './theme-controller.js'

class App {
  constructor() {
    this.todoController = null
    this.themeController = null
    this.init()
  }

  init() {
    this.initTodoApp()
    this.initThemeController()
  }

  initTodoApp() {
    const model = new TodoModel()
    const view = new TodoView()
    this.todoController = new TodoController(model, view)
  }

  initThemeController() {
    this.themeController = new ThemeController()
  }
}

const app = new App()
