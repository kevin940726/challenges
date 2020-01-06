import { useReducer, useCallback } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT":
      return {
        ...state,
        value: state.pending,
        status: "submitted"
      };
    case "CANCEL":
      return {
        ...state,
        status: "canceled",
        pending: state.value
      };
    case "TYPING":
      return {
        ...state,
        status: "typing",
        pending: action.payload
      };
    default:
      return state;
  }
};

const useRevertable = ({ initialValue }) => {
  const [state, dispatch] = useReducer(reducer, {
    pending: initialValue,
    value: initialValue
  });

  const submit = useCallback(
    val =>
      dispatch({
        type: "SUBMIT",
        payload: val
      }),
    []
  );

  const cancel = () =>
    dispatch({
      type: "CANCEL"
    });

  const typing = val =>
    dispatch({
      type: "TYPING",
      payload: val
    });

  return {
    pendingValue: state.pending,
    value: state.value,
    status: state.status,
    typing,
    cancel,
    submit
  };
};

export default useRevertable;
