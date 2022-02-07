// pure functions - концепт изолированных от основного кода функций


/**
 * capitalize
 * @param {*} str функция принимае стоку
 * @returns строку с заглавной первой буквой
 */

export function capitalize(str) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}
