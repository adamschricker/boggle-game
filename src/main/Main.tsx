import { observer } from 'mobx-react';

import { GameState, GameStoreProps } from '../store/Game';

import { Dice } from './Dice';
import { Instructions } from './Instructions';
import { Starting } from './Starting';


interface MainProps {
  gameStore: GameStoreProps,
}

export const Main = observer(({
  gameStore
}: MainProps): JSX.Element => {
  switch (gameStore.currentGameState) {
    case (GameState.NotStarted) :
      return <Instructions />
    case (GameState.Starting) :
      return <Starting
          message={gameStore.readySetGoMessage}
        />
    default :
      return <Dice
          diceValues={gameStore.diceValues}
          donePlaying={gameStore.currentGameState === GameState.DonePlaying}
          rotation={gameStore.rotation}
        />
  }
});
