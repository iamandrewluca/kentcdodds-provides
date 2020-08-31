import React, {
  Reducer,
  ReducerState,
  Dispatch,
  ReducerAction,
  PropsWithChildren,
} from 'react';

type Names = {
  provider: string;
  stateHook: string;
  dispatchHook: string;
};

export function kentcdoddsProvides<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  names: Names = {
    provider: 'Provider',
    stateHook: 'useState',
    dispatchHook: 'useDispatch',
  }
): [
  (props: PropsWithChildren<{}>) => JSX.Element,
  () => ReducerState<R>,
  () => Dispatch<ReducerAction<R>>,
  () => [ReducerState<R>, Dispatch<ReducerAction<R>>]
] {
  const StateContext = React.createContext<ReducerState<R> | undefined>(
    undefined
  );
  const DispatchContext = React.createContext<
    Dispatch<ReducerAction<R>> | undefined
  >(undefined);

  function Provider(props: PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {props.children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  }

  function useState() {
    const context = React.useContext(StateContext);
    if (context === undefined) {
      throw new Error(
        `${names.stateHook} must be used within a ${names.provider}`
      );
    }
    return context;
  }

  function useDispatch() {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
      throw new Error(
        `${names.dispatchHook} must be used within a ${names.provider}`
      );
    }
    return context;
  }

  function useStateAndDispatch(): [
    ReducerState<R>,
    Dispatch<ReducerAction<R>>
  ] {
    return [useState(), useDispatch()];
  }

  return [Provider, useState, useDispatch, useStateAndDispatch];
}
