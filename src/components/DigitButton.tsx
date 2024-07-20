import { ACTIONS } from "../App";

type Props = {
  digit: string;
  dispatch: React.Dispatch<Action>;
};

export function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
