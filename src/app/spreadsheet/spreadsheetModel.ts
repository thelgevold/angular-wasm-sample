import { KeyMap } from './key-map';
import { Row } from './row';
import { Cell } from './cell';

export class SpreadsheetModel {

  rows: Array<Row>;
  current: Cell;
  start: number;
  end: number;

  constructor(public rowCount, public columnCount) {

    this.rows = [];
    this.start = 0;
    this.end = 10;

    for (let i = 0; i < this.rowCount; i++) {

      this.rows.push(new Row(i, this.columnCount));
    }

    this.current = this.rows[0].cells[0];
  }

  selectColumn(col) {
    this.current = col;
  }

  navigate(keyCode) {

    const navDirection = KeyMap.getNavigationDirection(keyCode);

    if (navDirection.down) {
      this.ensureRow();
      this.current = this.rows[this.current.rowIndex + 1].cells[this.current.columnIndex];
      this.adjustRowRangeDownward();
    }
    if (navDirection.up) {
      if (this.current.rowIndex === 0) {
        return;
      }
      this.current = this.rows[this.current.rowIndex - 1].cells[this.current.columnIndex];
      this.adjustRowRangeUpward();
    }
    if (navDirection.left) {
      if (this.current.columnIndex === 0) {
        return;
      }
      this.current = this.rows[this.current.rowIndex].cells[this.current.columnIndex - 1];
    }
    if (navDirection.right) {
      if (this.current.columnIndex === this.columnCount - 1) {
        return;
      }
      this.current = this.rows[this.current.rowIndex].cells[this.current.columnIndex + 1];
    }
    if (navDirection.tab) {

      if (this.current.columnIndex === this.columnCount - 1) {
        this.ensureRow();
        this.current = this.rows[this.current.rowIndex + 1].cells[0];
        this.adjustRowRangeDownward();
      }
      else {
        this.current = this.rows[this.current.rowIndex].cells[this.current.columnIndex + 1];
      }
    }
  }

  adjustRowRangeUpward() {
    if (this.current.rowIndex < this.start) {
      this.shiftRowsBy(-1);
    }
  }

  adjustRowRangeDownward() {
    if (this.current.rowIndex === this.end) {
      this.shiftRowsBy(1);
    }
  }

  shiftRowsBy(offset) {
    this.start = this.start + offset;
    this.end = this.end + offset;
  }

  ensureRow() {
    if (this.current.rowIndex + 1 >= this.rows.length) {
      this.rows.push(new Row(this.current.rowIndex + 1, this.columnCount));
    }
  }

  calculate() {
    return {
      row0: this.sum(0),
      row1: this.sum(1),
      row2: this.sum(2),
      row3: this.sum(3)
    }
  }

  sum(index: number) {
    let sum = 0;
    this.rows.sort();
    for (let i = 0; i < this.rows.length; i++) {
      sum += 5 + 2 * parseInt(this.rows[i].cells[index].cellValue, 10);
    }

    return sum;
  }

  toDto(): Spredsheet {
    var spreadsheet = new Spredsheet();
    spreadsheet.rows = this.rows;

    return spreadsheet;
  }
}

export class Spredsheet {
  rows: Array<Row>;
}



