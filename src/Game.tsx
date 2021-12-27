import { css } from '@emotion/css'

import { GameStore } from './store/Game';

import { Header } from './header/Header';
import { Main } from './main/Main';

export const Game = (): JSX.Element => {
  const gameStore = new GameStore();

  return (
    <div
      className={css`
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100vh;
        margin: 0;
        overflow: hidden;
      `}
    >
      <Header
        gameStore={gameStore}
      />
      <Main
        gameStore={gameStore}
      />
    </div>
  );
}
