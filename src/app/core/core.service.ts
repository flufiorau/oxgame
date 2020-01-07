import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  gameBoardList = [
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ];

  winIndexesOfBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  botVsPlayer: boolean;
  statistics = [];
  private indexForNextTurn: number;

  constructor() {
  }

  boardIsFull() {
    return this.gameBoardList.every(value => value !== ' ');
  }

  writeToLogs(index: number, gamerSymbol: string) {
    const turnTime = new Date().toLocaleTimeString();
    const row = ((index - (index % 3)) / 3) + 1;
    const column = (index % 3) + 1;
    this.statistics.push(`${turnTime} ${this.playerName(gamerSymbol)} Row${row} Col${column}`);
  }

  playerName(gamerSymbol: string) {
    if (this.botVsPlayer) {
      return gamerSymbol === 'X' ? 'You' : 'Bot';
    } else {
      return gamerSymbol === 'X' ? 'Pl1' : 'Pl2';
    }
  }

  checkForWin(gamerSymbol: string): boolean {
    for (const combination of this.winIndexesOfBoard) {
      const win = combination.every(index => this.gameBoardList[index] === gamerSymbol);
      if (win) {
        return true;
      }
    }
    return;
  }

  turnWasTaken(index: number, gamerSymbol: string): boolean {
    this.gameBoardList[index] = gamerSymbol;
    this.writeToLogs(index, gamerSymbol);
    return this.checkForWin(gamerSymbol);
  }

  botWantWin(): Observable<any> {
    const gamerSymbol = 'O';
    const combinationsForNextTurn: Array<Array<number>> = [];
    const bestCombinations: Array<Array<number>> = [];
    const riskCombinations: Array<Array<number>> = [];
    const goodCombinations: Array<Array<number>> = [];
    const neutralCombinations: Array<Array<number>> = [];

    const isRiskCombination = (count: number, combination: Array<number>) => {
      return combination.some(ind => this.gameBoardList[ind] === ' ') && count === 2;
    };

    const isBestCombination = (count: number, combination: Array<number>) => {
      return combination.some(ind => this.gameBoardList[ind] === ' ') && count === 2;
    };

    const isGoodCombination = (combination) => {
      return combination.every(ind => this.gameBoardList[ind] !== 'X');
    };

    const isNeutralCombination = (combination) => {
      return combination.every(ind => (typeof this.gameBoardList[ind]) !== 'string');
    };

    const setIndexForNextTurn = (combination: number[]) => {
      combination.forEach(ind => {
        if (this.gameBoardList[ind] === ' ') {
          this.indexForNextTurn = ind;
        }
      });
      return of({indexForNextTurn: this.indexForNextTurn, gamerSymbol});
    };

    for (const combination of this.winIndexesOfBoard) {
      let xCounter = 0;
      let oCounter = 0;
      combination.forEach(ind => {
        if (this.gameBoardList[ind] === 'O') {
          oCounter++;
          if (isBestCombination(oCounter, combination)) {
            bestCombinations.push(combination);
          }
          if (isGoodCombination(combination) && !combinationsForNextTurn.includes(combination)) {
            combinationsForNextTurn.push(combination);
          }
        }
        if (this.gameBoardList[ind] === 'X') {
          xCounter++;
          if (isRiskCombination(xCounter, combination) && !riskCombinations.includes(combination)) {
            riskCombinations.push(combination);
          }
        }
        if (isGoodCombination(combination)) {
          goodCombinations.push(combination);
        }
        if (isNeutralCombination(combination)) {
          neutralCombinations.push(combination);
        }
      });
    }
    const priorityCombinationIs = (combinations) => {
      return combinations.length;
    };

    const randomCombinationFromList = (combinations) => {
      return combinations[Math.floor(Math.random() * combinations.length)];
    };

    if (priorityCombinationIs(bestCombinations)) {
      return setIndexForNextTurn(randomCombinationFromList(bestCombinations));
    } else if (priorityCombinationIs(riskCombinations)) {
      return setIndexForNextTurn(randomCombinationFromList(riskCombinations));
    } else if (priorityCombinationIs(combinationsForNextTurn)) {
      return setIndexForNextTurn(randomCombinationFromList(combinationsForNextTurn));
    } else if (priorityCombinationIs(goodCombinations)) {
      return setIndexForNextTurn(randomCombinationFromList(goodCombinations));
    } else if (priorityCombinationIs(neutralCombinations)) {
      return setIndexForNextTurn(randomCombinationFromList(neutralCombinations));
    }
  }
}
