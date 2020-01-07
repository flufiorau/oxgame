import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-end-info',
  templateUrl: './end-info.component.html',
  styleUrls: ['./end-info.component.css']
})
export class EndInfoComponent {

  @Input() winnerName: string;
  @Output() closeIt = new EventEmitter<boolean>();

  constructor() {
  }

  onClose() {
    this.closeIt.emit(true);
  }

}
