import {Component} from '@angular/core';
import {CoreService} from '../../core/core.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  playerWaitForBotTurn: boolean;
  nextPlayer = 'X';
  gameStart: boolean;
  gameEnd: boolean;
  showLogs = false;
  winnerName: string;
  private unsubscribe: Subject<void> = new Subject();

  constructor(public coreService: CoreService) {
  }

  checkAfterTurn(index: number, gamerSymbol: string) {
    if (this.coreService.turnWasTaken(index, gamerSymbol)) {
      this.endGameWithWinner(gamerSymbol);
    } else if (this.coreService.boardIsFull()) {
      this.endGameWithDraw();
    } else {
      if (!this.playerWaitForBotTurn) {
        this.nextTurn();
      } else {
        this.playerWaitForBotTurn = false;
      }
    }
  }

  nextTurn() {
    if (this.coreService.botVsPlayer === false) {
      this.nextPlayer = this.nextPlayer === 'O' ? 'X' : 'O';
      return;
    } else {
      this.playerWaitForBotTurn = true;
      this.coreService.botWantWin()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((value: { indexForNextTurn: number, gamerSymbol: string }) => {
          this.checkAfterTurn(value.indexForNextTurn, value.gamerSymbol);
          this.unsubscribe.next();
          this.unsubscribe.complete();
        });
    }
  }

  endGameWithWinner(gamerSymbol: string) {
    this.gameEnd = true;
    this.winnerName = this.coreService.playerName(gamerSymbol);
  }

  endGameWithDraw() {
    this.gameEnd = true;
    this.winnerName = 'Draw';
  }

  startGame(numberOfPlayers: any) {
    numberOfPlayers = +numberOfPlayers;
    this.coreService.botVsPlayer = numberOfPlayers === 1;
    this.gameStart = true;
    this.winnerName = undefined;
  }

  restartGame() {
    this.coreService.gameBoardList = this.coreService.gameBoardList.map(() => ' ');
    this.playerWaitForBotTurn = false;
    this.showLogs = false;
    this.gameStart = false;
    this.gameEnd = false;
    this.nextPlayer = 'X';
    this.coreService.statistics = [];
  }

  closeAppInfo() {
    this.winnerName = undefined;
  }
}
