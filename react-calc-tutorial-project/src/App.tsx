import { useReducer } from "react";
import "./App.css";
import { DigitButton } from "./components/DigitButton";
import { OperationButton } from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluation",
  CHOOSE_OPERATION: "choose-operation",
} as const;

type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];
interface State {
  currentOperand?: string | null;
  previousOperand?: string | null;
  operation?: string | null;
  overwrite?: boolean;
}

interface Action {
  type: ActionType;
  payload?: {
    digit?: string;
    operation?: string;
  };
}

function evaluate({
  currentOperand,
  previousOperand,
  operation,
}: State): string {
  if (!previousOperand || !currentOperand) return "";
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let computation = "";
  switch (operation) {
    case "+":
      computation += prev + current;
      break;
    case "-":
      computation += prev - current;
      break;
    case "÷":
      computation += prev / current;
      break;
    case "*":
      computation += prev * current;
      break;
  }
  return computation;
}

function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload?.digit,
          overwrite: false,
        };
      }
      if (payload?.digit === "0" && state.currentOperand === "0") return state;
      if (payload?.digit === "." && state.currentOperand === null) {
        console.log(". pressed");
        return {
          ...state,
          currentOperand: `0${payload?.digit}`,
        };
      }
      if (payload?.digit === "." && state.currentOperand?.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload?.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.currentOperand === null) {
        return {
          ...state,
          operation: payload?.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload?.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload?.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {
        currentOperand: null,
        previousOperand: null,
      };
    case ACTIONS.DELETE_DIGIT:
      console.log("running");
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (!state.currentOperand) return state;
      if (state.currentOperand?.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand?.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: payload?.operation,
        currentOperand: evaluate(state),
      };
  }
}

export function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: null, previousOperand: null }
  );

  return (
    <>
      <div className="calculator-grid w-fit">
        <div className="output">
          <div className="previous-operand">
            {previousOperand} {operation}
          </div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          className="col-span-2"
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className="col-span-2"
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
