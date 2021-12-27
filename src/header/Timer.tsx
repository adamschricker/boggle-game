import { observer } from 'mobx-react';
import { css } from '@emotion/css'

import { GameState } from '../store/Game';


interface TimerProps {
  currentGameState: GameState,
  value: number,
}

export const Timer = observer(({
  currentGameState,
  value
}: TimerProps): JSX.Element => {

  const displayTimer: boolean = currentGameState !== GameState.NotStarted
    && currentGameState !== GameState.Starting;

  const minutes: string = Math.floor(value / 60).toString();
  let seconds: string = Math.floor(value % 60).toString();
  if (seconds.length === 1) { seconds = '0' + seconds; }

  return (
    <div
      className={css`
        color: ${currentGameState === GameState.DonePlaying ? 'red' : 'inherit'};
        flex: 1 1 auto;
        font-size: 1.5rem;
        padding: 1rem;
        text-align: center;
        visibility: ${displayTimer ? 'visible' : 'hidden'}
      `}
    >
      {
        currentGameState === GameState.DonePlaying
          ? 'GAME OVER'
          : `Timer: ${minutes}:${seconds}`
      }
    </div>
  );
});
