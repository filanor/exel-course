import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  /*
  конструктор принимает корневой DOM элемент и передает его и набор опций,
  характерных для класса Formula в конструктор ExcelComponent
  (от которого Foormula наследуется)
  В качестве опций передается name, что бы можно было понять где ошибка, если
  она появится, а так же набор listeners
  */
  constructor($root) {
    super( $root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div> 
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event)
  }
}
