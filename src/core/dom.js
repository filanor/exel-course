class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  /*
  метод html выполняет роль гетера и сетера
  (в зависимости от того передан ли аргумент)
  если передана строка она передается как html (innerHTML)
  в элемент, заменяя содержимое элемента
  если не передан - возвращает html код элемента
  */
  html(html) {
    if ( typeof html === 'string') {
      this.$element.innerHTML = html
      return this
    }

    return this.$element.outerHTML.trim()
  }

  // очищает элемент от html
  // возвращает this для осуществления цепочек (как jQuery)
  clear() {
    this.html('')
    return this
  }

  // просто вызывает addEventListener. сделано потому что в
  // компонентах работа ведется с элементом класса Dom, у которого нет
  // иначе доступа к addEventListener
  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback)
  }

  removeListener(eventType, callback) {
    this.$element.removeEventListener(eventType, callback)
  }

  // Метод Element.append() вставляет узлы или строки с текстом в конец элемента
  append(node) {
    if ( node instanceof Dom ) {
      node = node.$element
    }
    if (Element.prototype.append) {
      this.$element.append(node)
    } else {
      this.$element.appendChild(node)
    }

    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}


/*
Функция создает DOM элемент
Полчает параметры:
  tagName - тэг который нужно создать
  classes - список классов для элемента
Возвращает
  el созданный объект класа dom
*/
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if ( classes ) {
    el.classList.add(classes)
  }
  return $(el)
}
