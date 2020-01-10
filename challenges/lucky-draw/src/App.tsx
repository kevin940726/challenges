import React, {
  useState,
  useEffect,
  ReactText,
  FC,
  ClipboardEvent,
} from 'react';
import { getRand } from './utils';

const App: FC = () => {
  const [list, setList] = useState<string[] | number[] | ReactText[]>([]);
  const [prizes, setPrizes] = useState(1);
  const [result, setResult] = useState<number[] | null>(null);
  const generateSerialNum = () => {
    const res = window.prompt('');
    if (res && Number(res)) {
      setList(new Array(Number(res)).fill(1).map((_, i: number) => i + 1));
    }
  };

  useEffect(() => {
    setResult(null);
  }, [prizes]);

  const onPasteList = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const { clipboardData } = e;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text');
      setList(pastedText.split('\n'));
    }
  };

  const onChangeTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    if (target && target.value) {
      setList(target.value.split('\n'));
    }
  };

  const onClickDraw = () => {
    const newList = (list as Array<number | string>).filter(
      (item: string | number) => item !== ''
    );
    setList(newList);
    const drawResult = getRand(newList.length, prizes);
    setResult(drawResult);
  };

  return (
    <main className="App">
      <label htmlFor="prizeNumber">抽幾個出來？</label>
      <input
        id="prizeNumber"
        value={prizes}
        min={1}
        max={Math.pow(2, 32)}
        type="number"
        onChange={e => setPrizes(Number(e.target.value))}
      />
      <section>
        <span>請在下方貼上抽獎名單（分行）或</span>
        <button onClick={generateSerialNum}>產生序號</button>
        <textarea
          style={{ display: 'block', margin: 'auto' }}
          onChange={onChangeTextInput}
          onPaste={onPasteList}
          value={list.join('\n')}
        />
      </section>
      <section>
        <button
          disabled={!list.length || list.length < prizes}
          onClick={onClickDraw}
        >
          抽
        </button>
        <div>得獎的是 {result && result.map(i => list[i]).join(',')}</div>
      </section>
    </main>
  );
};

export default App;
