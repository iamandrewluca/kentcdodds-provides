import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CountProvider, useCountState, useCountDispatch } from './count-context';

function App() {
  const count = useCountState();
  const dispatch = useCountDispatch();
  return (
    <div className="App">
      {count}
      <h1 onClick={() => dispatch({ type: "increment" })}>Hello CodeSandbox</h1>
      <h2 onClick={() => dispatch({ type: "decrement" })}>
        Start editing to see some magic happen!
      </h2>
    </div>
  );
};

ReactDOM.render(
  <CountProvider>
    <App />
  </CountProvider>,
  document.getElementById('root')
);
