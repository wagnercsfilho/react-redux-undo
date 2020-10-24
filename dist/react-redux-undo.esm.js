const UNDO = "@@redux-react-undo/undo";
const REDO = "@@redux-react-undo/redo";
const CLEAR = "@@redux-react-undo/clear";

const defaultOptions = {
  maxHistory: 10,
};

const applyUndo = (_reducer, options = defaultOptions) => {
  let _states = {
    past: [],
    future: [],
  };

  options = { ...defaultOptions, ...options };

  const undoReducer = (currState, action) => {
    switch (action.type) {
      case UNDO:
        const previous = _states.past[_states.past.length - (action.position || 1)];
        const newPast = _states.past.slice(
          0,
          _states.past.length - (action.position || 1)
        );

        if (previous) {
          _states.past = newPast;
          _states.future = [currState, ..._states.future];
        }

        return previous || currState;
      case REDO:
        const next = _states.future[0];
        const newFuture = _states.future.slice(1);

        if (next) {
          _states.past = [..._states.past, currState];
          _states.future = newFuture;
        }

        return next || currState;
      case CLEAR:
        _states.past = [];
        _states.future = [];
        return currState;
      default:
        const newPresent = _reducer(currState, action);
        if (currState === newPresent) {
          return currState;
        }
        if (currState) _states.past.push(currState);
        if (options.maxHistory === _states.past.length - 1) {
          _states.past = _states.past.slice(1);
        }
        return newPresent;
    }
  };
  return (prevState, action) => {
    return undoReducer(prevState, action);
  };
};

const ActionCreators = {
  undo: (position = 1) => {
    return { type: UNDO, position };
  },
  redo: () => {
    return { type: REDO };
  },
  clear: () => {
    return { type: CLEAR };
  },
};

export { ActionCreators, CLEAR, REDO, UNDO, applyUndo };
