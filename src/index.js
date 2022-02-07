import {Excel} from 'Src/components/excel/Excel';
import {Header} from 'Src/components/header/Header';
import {Toolbar} from 'Src/components/toolbar/Toolbar';
import {Formula} from 'Src/components/formula/Formula';
import {Table} from 'Src/components/table/Table';

import './scss/index.scss';


// Создаем объект класса Excel
// и передаем в него стартовую точку и компонеты
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

// Выводим на экран используя метод render класса Excel
excel.render()
