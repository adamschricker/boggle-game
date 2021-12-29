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
        disabled={hideRotateButton}
        onClick={rotateButtonClick}
      >
        <svg height="40" viewBox="0 0 32 30" width="40" xmlns="http://www.w3.org/2000/svg">
          <g id="Guides__x26__Forms"/>
          <g id="Icons">
            <path d="M24,13V7.369L21.899,9.47c-1.537-1.54-3.657-2.495-6.005-2.495c-4.694,0-8.5,3.806-8.5,8.5s3.806,8.5,8.5,8.5   c3.159,0,5.91-1.727,7.375-4.286l-1.737-0.993c-1.122,1.955-3.226,3.278-5.638,3.278c-3.584,0-6.5-2.916-6.5-6.5   c0-3.584,2.916-6.5,6.5-6.5c1.792,0,3.414,0.732,4.59,1.91L18.369,13H24z" fill="#f6f6f6"/>
          </g>
        </svg>
      </button>
      <button
        className="primary"
        disabled={hidePlayButton}
        onClick={playButtonClick}
      >
        <svg height="40" viewBox="0 0 48 48" width="40" xmlns="http://www.w3.org/2000/svg">
          <path d="M-838-2232H562v3600H-838z" fill="none"/>
          <path d="M16 10v28l22-14z" fill="#f6f6f6"/>
          <path d="M0 0h48v48H0z" fill="none"/>
        </svg>
      </button>
    </div>
  );
});
