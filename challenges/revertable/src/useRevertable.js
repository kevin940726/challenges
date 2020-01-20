import { useCallback, useState } from 'react';

const useRevertable = ({ realValue, realOnChange }) => {
  const [value, setCurrentValue] = useState(realValue);

  const onChange = val => {
    setCurrentValue(val);
  };

  const submit = () => {
    realOnChange(value);
  };

  const cancel = () => {
    setCurrentValue(realValue);
  };

  return {
    cancel,
    submit,
    onChange,
    value,
  };
};

export default useRevertable;
