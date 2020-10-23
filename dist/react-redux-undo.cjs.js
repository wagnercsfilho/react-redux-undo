"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const UNDO = "__UNDO__";
const APPLY_UNDO = "__APPLY_UNDO__";
const CLEAR = "__CLEAR__";

const undoMiddleware = function (options = { maxHistory: 10 }) {
  let _states = [];
  return (store) => (next) => (action) => {
    switch (action.type) {
      case UNDO:
        if (_states.length) {
          const s = _states.splice(-(action.position || 1));
          const lastState = s.shift();
          store.dispatch({ type: APPLY_UNDO, state: lastState });
        }
        break;
      case CLEAR:
        _states = [];
        break;
      default:
        if (action.type !== APPLY_UNDO && action.type !== CLEAR) {
          if (_states.length === options.maxHistory) {
            _states.shift();
          }
          _states.push(store.getState());
        }
    }

    next(action);
  };
};

const applyUndo = (_reducer) => {
  const undoReducer = (prevState, currState, action) => {
    if (action.type === APPLY_UNDO) {
      return action.state;
    }
    return currState;
  };
  return (state, action) => {
    const _state = _reducer(state, action);
    return undoReducer(state, _state, action);
  };
};

const ActionCreators = {
  undo: (position = 1) => {
    return { type: UNDO, position };
  },
  clear: () => {
    return { type: CLEAR };
  },
};

exports.APPLY_UNDO = APPLY_UNDO;
exports.ActionCreators = ActionCreators;
exports.CLEAR = CLEAR;
exports.UNDO = UNDO;
exports.applyUndo = applyUndo;
exports.undoMiddleware = undoMiddleware;
