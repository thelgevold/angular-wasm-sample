import { Component, AfterViewChecked, Input } from '@angular/core';
import { SpreadsheetModel } from './spreadsheetModel';
import { HeaderRowService } from './header-row-service';

declare const msgpack5: any;
declare const Module: any;

@Component({
  selector: 'spreadsheet',
  styleUrls: ['spreadsheet.css'],
  template: `
    <table id="spreadsheet">
        <tr>
            <td class="row-number-column"></td>
            <td class="columnHeader" *ngFor="let columnHeader of header">{{columnHeader}}</td>
        </tr>
        <tr *ngFor="let row of visibleRows">
            <td class="row-number-column">{{row.rowIndex}}</td>
            <td *ngFor="let cell of row.cells">
                <input data-id="{{cell.rowIndex}}-{{cell.columnIndex}}" [value]="cell.cellValue" (input)="cell.cellValue = $event.target.value" (click)="model.selectColumn(cell)" (keydown)="navigate($event)" />
            </td>    
        </tr>
    </table>
    <button (click)="calculateSums()">Calculate Column Sums</button> <span *ngIf="sum"> The sum of all columns is {{ sum }}</span>
    `,
})
export class Spreadsheet implements AfterViewChecked {
  model: SpreadsheetModel;
  @Input() rows: Number;
  @Input() columns: Number;
  header = [];
  visibleRows = [];
  sum: number;

  constructor() {
    const rowCount = 20;
    this.model = new SpreadsheetModel(rowCount, 4);

    for (let i = 0; i < rowCount; i++) {
      this.model.rows[i].cells[0].cellValue = i.toString();
      this.model.rows[i].cells[1].cellValue = i.toString();
      this.model.rows[i].cells[2].cellValue = i.toString();
      this.model.rows[i].cells[3].cellValue = i.toString();
    }

    this.header = HeaderRowService.createHeader(
      this.model.rows[0].cells.length,
    );

    this.visibleRows = this.getVisibleRows();
  }

  getHeader() {
    return HeaderRowService.createHeader(this.model.rows[0].cells.length);
  }

  navigate($event) {
    this.model.navigate($event.keyCode);
    this.visibleRows = this.getVisibleRows();
  }

  ngAfterViewChecked() {
    let cell = document.getElementById(
      this.model.current.rowIndex + '-' + this.model.current.columnIndex,
    );
    cell.focus();
  }

  getVisibleRows() {
    return this.model.rows.filter(
      row => row.rowIndex >= this.model.start && row.rowIndex < this.model.end,
    );
  }

  getActive(col) {
    if (col === this.model.current) {
      return 'active-cell';
    }
  }

  calculateSums() {
    const msgpack = msgpack5();

    const encoded = msgpack.encode(this.model.toDto());

    var bufferSize = Module._malloc(encoded.length);

    var bytes_per_element = encoded.BYTES_PER_ELEMENT;
    Module.HEAP8.set(encoded, bufferSize / bytes_per_element);

    const calculate_sums = Module.cwrap("calculate_sums", "number", ["number"]);

    this.sum = calculate_sums(bufferSize, encoded.length);
    
    Module._free(bufferSize);
  }
}
