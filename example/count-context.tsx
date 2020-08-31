import { kentcdoddsProvides } from '../.';

type State = number;
type Action = { type: 'increment' } | { type: 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState = 0;

const [
  CountProvider,
  useCountState,
  useCountDispatch,
  useCount,
] = kentcdoddsProvides(reducer, initialState, {
  provider: 'CountProvider',
  stateHook: 'useCountState',
  dispatchHook: 'useCountDispatch',
});

export { CountProvider, useCountState, useCountDispatch, useCount };
