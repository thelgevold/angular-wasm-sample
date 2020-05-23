import { Cell } from './cell';

export class Row {

  cells: Array<Cell>;

  constructor(public rowIndex, public columnCount) {
    this.cells = [];

    for (let j = 0; j < this.columnCount; j++) {
      this.cells.push(new Cell(j, this.rowIndex));
    }
  }
}