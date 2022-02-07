const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `
}


/**
 * Фунция, генерирующая яцейку заголовка таблицы с названием колонки
 * @param {*} content содержимое ячейки - буква названия колонки
 * @returns HTML код ячейки первой строки таблицы
 */

function createCol(content) {
  return `
    <div class="column">${content}</div>
  `
}


/**
 * Функция генерирует HTML код строки таблицы Excel
 * @param {*} content содержимое строки
 * @returns HTML код соки таблицы
 */

function createRow(content, number = '') {
  return `
  <div class="row">
    <div class="row-info">${number}</div>
    <div class="row-data">${content}</div>
  </div>
  `
}


/**
 * @param {*} _ плейсхолдер. функция используется с map, где
 *  первым параметром передается элемент, который мы не используем
 * @param {*} index номер ячейки
 * @returns букву, соответствующую номеру ячейки в формате строки
 */

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


/**
 * Функция генерирует HTML код таблицы Excel
 * @param {*} rowsCount количесво строк в таблице
 * @returns HTML код готовой таблицы
 */

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const row = []

  // генерируем первую строчку таблицы
  // const headerCols = new Array(colsCount)
  //     .fill('')
  //     .map( (el, index) => {
  //       return String.fromCharCode(CODES.A + index)
  //     })
  //     .map( (el) => {
  //       return createCol(el)
  //     })
  //     .join('')
  // Запишем более красиво, передавая функцию как референс
  const headerCols = new Array(colsCount)
      .fill('')
      .map(toChar) // .map( (el, index) => toChar(el, index) )
      .map(createCol) // .map( el => createCol(el) )
      .join('')

  row.push(createRow(headerCols))

  // пустые ячейки
  for (let i = 0; i < rowsCount; i++) {
    const cellArray = new Array(colsCount)
        .fill(createCell())
        // .map(createCell)
        .join('')
    row.push(createRow(cellArray, i+1))
  }

  // Приведем массив row к формату строк с помощью join(')
  return row.join('')
}
