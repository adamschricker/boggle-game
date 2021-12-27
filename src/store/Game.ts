import { makeAutoObservable } from 'mobx';

export enum GameState {
  NotStarted = "NotStarted",
  Starting = "Starting",
  Playing = "Playing",
  DonePlaying = "DonePlaying",
}

export interface GameStoreProps {
  currentGameState: GameState,
  currentTimerValue: number,
  diceValues: string[],
  readySetGoMessage: string,
  rotation: number,

  rotate: () => void,
  startingGame: () => void,
}

export class GameStore {
  currentGameState: GameState = GameState.NotStarted;
  currentTimerValue: number = 0;
  diceValues: string[] = [];
  readySetGoMessage: string = '';
  rotation: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  buildDice = (): string[] => {
    /** Which letters used most - https://www.lexico.com/explore/which-letters-are-used-most **/
    const weightedAlphabet: string[] = [
      'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',
      'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b',
      'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c',
      'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd',
      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
      'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f',
      'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g',
      'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h',
      'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i',
      'j', 'j',
      'k', 'k', 'k', 'k',
      'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l',
      'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm',
      'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n',
      'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
      'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
      'qu', 'qu', 'qu',
      'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r',
      's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's',
      't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't', 't',
      'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u',
      'v', 'v', 'v', 'v', 'v', 'v',
      'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',
      'x', 'x',
      'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y',
      'z'
    ];

    const randomLetter = (): string => {
      return weightedAlphabet[Math.floor(Math.random() * weightedAlphabet.length)];
    }

    const dice: string[] = [];
    for (let n = 0; n < 16; n++) {
      dice.push(randomLetter());
    }

    return dice;
  }

  endGame = (): void => {
    this.currentGameState = GameState.DonePlaying;
    this.rotation = 0;
  }

  readySetGo = (message: string = 'Ready'): void => {
    this.readySetGoMessage = message;

    const nextMessage: string = message === 'Ready' ? 'Set' : 'Go';

    if (message === 'Go') {
      setTimeout(this.startGame, 1000);
    } else {
      setTimeout(() => this.readySetGo(nextMessage), 1000);
    }
  }

  rotate = (): void => {
    this.rotation++;
    if (this.rotation > 3) {
      this.rotation = 0;
    }
  }

  startGame = (): void => {
    this.currentGameState = GameState.Playing;

    this.diceValues = this.buildDice();
    this.timer();
  }

  startingGame = (): void => {
    const getStarted = (): void => {
      this.currentGameState = GameState.Starting;

      this.readySetGo();
    }

    if (this.currentGameState === GameState.DonePlaying) {
      if (window.confirm('Ready for another game?')) {
        getStarted();
      }
    } else {
      getStarted();
    }
  }

  timer = (value: number = 180): void => {
    if (value === 0) {
      this.endGame();
    } else {
      this.currentTimerValue = value;
      const nextValue = value - 1;
      setTimeout(() => this.timer(nextValue), 1000);
    }
  }

}
