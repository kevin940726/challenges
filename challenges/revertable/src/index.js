import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useRevertable from './useRevertable';

function App() {
  const [realValue, setRealValue] = useState('hello world');
  const { cancel, submit, onChange, value } = useRevertable({
    realValue,
    realOnChange: val => {
      setRealValue(val);
    },
  });

  return (
    <div className="App">
      <h2>{realValue}</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <input onChange={e => onChange(e.target.value)} />
        <button type="submit">Submit</button>
        <button onClick={() => cancel()}>Cancel</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
