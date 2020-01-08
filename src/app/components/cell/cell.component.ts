import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {

  @Input() public gameEnd: boolean;
  @Input() public cell: string;
  @Input() public playerSymbol: string;
  @Output() public turn = new EventEmitter<string>();

  constructor() {
  }

  turnFromPlayer() {
    this.turn.emit(this.playerSymbol);
  }
}
