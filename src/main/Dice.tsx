import { css } from '@emotion/css'
import { useEffect, useRef } from 'react';


interface DiceProps {
  diceValues: string[];
  donePlaying: boolean;
  rotation: number;
}

export const Dice = ({
  diceValues,
  donePlaying,
  rotation,
}: DiceProps): JSX.Element => {
  const diceRef = useRef() as React.MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    const element = diceRef.current;

    if (element && element.offsetHeight && element.offsetWidth) {
      const max: number = Math.min(element.offsetHeight, element.offsetWidth);

      element.style['fontSize'] = `${Math.floor(max / 7)}px`;
      element.style['height'] = `${max}px`;
      element.style['width'] = `${max}px`;
    }
  });

  return (
    <ul
      ref={diceRef}
      className={css`
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        margin: auto;
        overflow: hidden;
        padding: 2rem;
        transition: all 0.3s ease-in-out;
        transform: rotate(${90 * rotation}deg);
        width: 100%;

        > li {
          align-items: center;
          background-color: var(--color-dice-background);
          border: thin solid var(--color-border);
          border-radius: 1rem;
          color: var(${donePlaying ? '--color-alert' : '--color-dice-text'});
          display: flex;
          height: 25%;
          justify-content: center;
          list-style: none;
          margin: 0;
          padding: 0;
          text-transform: capitalize;
          transform: rotate(-${90 * rotation}deg);
          transition: all 0.3s 0.3s ease-in-out;
          width: 25%;
        }
      `}
    >
    {
      diceValues.map((die, index) => <li key={index}>{die}</li>)
    }
    </ul>
  );
}
