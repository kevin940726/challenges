import React from 'react';
import ReactDOM from 'react-dom';
import useRevertable from './useRevertable';

function App({ text }) {
  const { pendingValue, value, cancel, submit, status, typing } = useRevertable(
    {
      initialValue: text,
    }
  );

  return (
    <div className="App">
      <h2>{value}</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          value={status === 'typing' ? pendingValue : value}
          onChange={e => typing(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button onClick={() => cancel()}>Cancel</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App text="Happy new year" />, rootElement);
