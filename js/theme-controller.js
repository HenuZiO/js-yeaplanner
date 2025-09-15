export class ThemeController {
  constructor() {
    this.currentTheme = 'dark'
    this.themeToggle = null
    this.init()
  }

  init() {
    this.themeToggle = document.querySelector('[data-theme-toggle]')
    this.initEventListeners()
    this.loadFromLocalStorage()
  }

  initEventListeners() {
    if (!this.themeToggle) return

    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme()
    })
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark'
    this.setTheme(newTheme)
  }

  setTheme(theme) {
    this.currentTheme = theme
    this.applyTheme()
    this.saveToLocalStorage()
  }

  applyTheme() {
    document.body.classList.remove('theme_light', 'theme_dark')
    document.body.classList.add(`theme_${this.currentTheme}`)

    if (this.themeToggle) {
      this.themeToggle.classList.toggle('theme-toggle--light', this.currentTheme === 'light')
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('theme', JSON.stringify(this.currentTheme))
  }

  loadFromLocalStorage() {
    const rawData = localStorage.getItem('theme')

    if (!rawData) return

    try {
      const parsedData = JSON.parse(rawData)

      if (['light', 'dark'].includes(parsedData)) {
        this.currentTheme = parsedData
      }
    } catch (error) {
      console.error('Ошибка извлечения темы:', error)
    }

    this.applyTheme()
  }

  getTheme() {
    return this.currentTheme
  }
}
