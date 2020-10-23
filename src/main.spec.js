import { applyUndo } from "../dist/react-redux-undo.cjs";
import { ActionCreators, APPLY_UNDO, CLEAR, UNDO } from "./main";

describe("React Redux Undo", () => {
  describe("ActionCreators", () => {
    describe("undo", () => {
      it("should return a undo action creator", () => {
        expect(ActionCreators.undo()).toEqual({
          type: UNDO,
          position: 1,
        });
        expect(ActionCreators.undo(2)).toEqual({
          type: UNDO,
          position: 2,
        });
      });
    });

    describe("clear", () => {
      it("should return a clear action creator", () => {
        expect(ActionCreators.clear()).toEqual({
          type: CLEAR,
        });
      });
    });
  });

  describe("applyUndo", () => {
    it("should return a function", () => {
      const reducerMock = () => {};
      const undoReducer = applyUndo(reducerMock);

      expect(undoReducer).toBeInstanceOf(Function);
    });

    it("should call reducer and return the current state", () => {
      const reducerMock = (state) => {
        return state;
      };

      const state = { count: 1 };
      const action = {};

      const undoReducer = applyUndo(reducerMock);

      expect(undoReducer(state, action)).toEqual(state);
    });

    it("should apply undo and return last state if action type is APPLY_UNDO", () => {
      const reducerMock = (state) => {
        return state;
      };

      const state = { count: 2 };
      const action = {
        type: APPLY_UNDO,
        state: { count: 1 },
      };

      const undoReducer = applyUndo(reducerMock);

      expect(undoReducer(state, action)).toEqual(action.state);
    });
  });
});
