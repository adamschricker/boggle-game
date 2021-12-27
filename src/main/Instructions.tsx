import { css } from '@emotion/css'


export const Instructions = (): JSX.Element => (
  <div
    className={css`
      margin: 0 auto;
      overflow: auto;
      padding: 2rem;
      width: 100%;

      > h2 {
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 2;
      }

      > p {
        line-height: 1.5;
        margin-bottom: 1rem;
      }

      > ul { margin: 0 0 1rem 2rem; }
      > ul li { margin: 0 0 0.5rem 0; }

      > div {
        margin-top: 2rem;
        text-align: center;
      }
    `}
  >
    <h1
      className={css`
        border-bottom: thin solid var(--color-webpage-text);
        font-size: 1.5rem;
        margin-bottom: 1rem;
      `}
    >
      Fun game for a group - in-person or online
    </h1>
    <h2>How to play:</h2>
    <ul>
      <li>Click play button to start.</li>
      <li>Each player writes down all the words they see (3 or more letters).</li>
      <li>Letters should be next to each other - left, right, up, down, or diagonal.</li>
      <li>Click rotate button to get a new view.</li>
      <li>After 3 minutes the timer goes off - all players stop writing.</li>
    </ul>
    <h2>Each player will need:</h2>
    <ul>
      <li>Pieces of paper.</li>
      <li>Pen or pencil.</li>
    </ul>
    <h2>Scoring:</h2>
    <ul>
      <li>Each player reads out their list of words.</li>
      <li>Any matching words are crossed out for all players.</li>
      <li>Unique words are scored - 3 letters = 1 point, 4 letters = 2 points, and so on.</li>
      <li>Tally each player's points and repeat till tired or a certain point goal is reached.</li>
    </ul>
  </div>
);
