import {$} from 'Src/core/dom'

export class Excel {
  /**
   * @param {*} selector - получаем стартовый селектор (#app)
   * @param {*} options - получаем компоненты (Headet, Toolbal, Formula ...)
   */
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  // возвращает корневой узел страницы Excel
  getRoot() {
    // создаем div с классом excel
    const $root = $.create('div', 'excel')

    this.components = this.components.map( (Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    /**
     *  перезаписываем массив this.components, делая его массивом объектов
     *  а так же генерируем страницу excel - подробнее ниже
     */

    // проходим по полученным компонентам
    // this.components.forEach( (Component) => {
    // создаем обертку div для компонента,
    // с соответствующим классом (поле static className)
    // const $el = $.create('div', Component.className)

    // создаем экземпляр компонента и помещаем его в $el
    // const component = new Component($el)
    // тут передаем $el, что бы не было ошибки DomListener

    // $el.html(component.toHTML())
    // $el.innerHTML = component.toHTML()

    // помещаем компоненты в $root
    // $root.append($el)
    // });

    return $root
  }

  /**
   * метод render добавляет полученую Dom структуру ()
   * в корневой элемент программы в нашем случае #app
   *  Так же после этого проходимся циклом по всем объектам и вызываем
   * унаследованный от ExcelComponent метод init(), который в свою очередь
   *  вызовет метод initDOMListeners() из DomLisdtener. и таким образом
   * повесим слушателей
   */
  render() {
    this.$el.append(this.getRoot() )
    this.components.forEach( (component) => component.init() )

    // Варианты вместо this.$el.append(this.getRoot() )
    // afterbegin, afterend, beforeend, beforebegin
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>test</h1>')

    // const node = document.createElement('h1')
    // node.textContent = 'TEST'
    // this.$el.append(node)
  }
}

