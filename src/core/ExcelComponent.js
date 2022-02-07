import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  /**
   * @param {*} $root - корневой элемент
   * @param {*} options - набор опций характерных для наследуемого класса.
   * Подробнее описано в классе Formuls
   */
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
  }

  // Возвращает шаблон компонента в виде HTML
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }
}
