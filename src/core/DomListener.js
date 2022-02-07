import {capitalize} from './utils';

export class DomListener {
  /**
   *
   * @param {*} $root - корневой элемент на который будут вешаться слушатели
   * @param {*} listeners -список слушателей от наследных компонентов
   */
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }

    // Помещаем полученные аргументы в this, что бы мы могли
    // работать с ними в методах класса
    this.$root = $root
    this.listeners = listeners
  }

  // метод для добавления слушателей
  // this.listeners - просто массив строк с названиями событий
  initDOMListeners() {
    this.listeners.forEach( (listener) => {
      const method = getMethodName(listener)
      // Мы находимся в стрелочной функции, у которой нет своего контекста
      // Поэтому можем использовать this

      // Если метод отработки события не реализован в компоненте - выдаем ошибку
      if ( !this[method] ) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      // В this находится объет компонентов (Formula, Table, Header, Toolbar)
      // значит мы можем использовать их методы.
      // Так же привязываем контекст bind(this)
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])

      // Если мы не будем перезаписывать метод в объекте и передадим в on()
      // this[method].bind(this), то мы не сможем удалять события, так как bind
      // создает новую функцию и передавать мы будем новую функцию, а не ту что
      // находится в this[method]
      // this.$root.on(listener, this[method].bind(this))
    });
  }

  // метод для удаления слушателей
  removeDOMListener() {
    this.listeners.forEach( (listener) => {
      const method = getMethodName(listener)
      this.$root.removeListener(listener, this[method])
    })
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
