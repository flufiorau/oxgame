import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CellComponent} from './components/cell/cell.component';
import {BoardComponent} from './components/board/board.component';
import {LogsComponent} from './components/logs/logs.component';
import {EndInfoComponent} from './components/end-info/end-info.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoardComponent,
    LogsComponent,
    EndInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
