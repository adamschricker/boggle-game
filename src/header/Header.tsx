import { observer } from 'mobx-react';
import { css } from '@emotion/css'

import { GameStoreProps } from '../store/Game';

import { Buttons } from './Buttons';
import { Timer } from './Timer';


interface HeaderProps {
  gameStore: GameStoreProps,
}

export const Header = observer(({
  gameStore
}: HeaderProps): JSX.Element => (
  <div
    className={css`
      align-items: center;
      border-bottom: 1px solid var(--color-webpage-text);
      display: flex;
      flex: 0 0 auto;
      flex-direction: row;
      padding: 1rem;
      width: 100%;
    `}
  >
    <div
      className={css`
        align-items: center;
        display: flex;
        flex: 1 1 auto;
        flex-direction: row;
        flex-wrap: wrap;
      `}
    >
      <h1
        className={css`
          font-size: 2rem;
        `}
      >
        Boggle
      </h1>
      <Timer
        currentGameState={gameStore.currentGameState}
        value={gameStore.currentTimerValue}
      />
    </div>
    <Buttons
      currentGameState={gameStore.currentGameState}
      playButtonClick={gameStore.startingGame}
      rotateButtonClick={gameStore.rotate}
    />
  </div>
));
