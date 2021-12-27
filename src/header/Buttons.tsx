import { observer } from 'mobx-react';
import { css } from '@emotion/css'

import { GameState } from '../store/Game';


interface ButtonsProps {
  currentGameState: GameState,
  playButtonClick: () => void,
  rotateButtonClick: () => void,
}

export const Buttons = observer(({
  currentGameState,
  playButtonClick,
  rotateButtonClick,
}: ButtonsProps): JSX.Element => {

  const hidePlayButton: boolean = currentGameState === GameState.Playing;
  const hideRotateButton: boolean = currentGameState !== GameState.Playing;

  return (
    <div
      className={css`
        display: flex;

        > button {
          margin-left: 1rem;
        }
      `}
    >
      <button
        className={css`font-weight: bold`}
        disabled={hideRotateButton}
        onClick={rotateButtonClick}
      >
        &#8631;
      </button>
      <button
        className="primary"
        disabled={hidePlayButton}
        onClick={playButtonClick}
      >
        &#9654;
      </button>
    </div>
  );
});
