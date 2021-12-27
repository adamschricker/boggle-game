import { css } from '@emotion/css'


interface StartingProps {
  message: string,
}

export const Starting = ({
  message
}: StartingProps): JSX.Element => (
  <div
    className={css`
      align-items: center;
      display: flex;
      flex: 1 1 auto;
    `}
  >
    <h1
      className={css`
        animation: fontChange 3s;
        font-weight: bold;

        @keyframes fontChange {
          from {
            font-size: 1rem;
          }
          33% {
            font-size: 3rem;
          }
          66% {
            font-size: 6rem;
          }
          to {
            font-size: 12rem;
          }
        }
      `}
      id='message'
    >
      { message }
    </h1>
  </div>
);
