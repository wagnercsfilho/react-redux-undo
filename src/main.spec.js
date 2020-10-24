import { ActionCreators, CLEAR, UNDO, REDO } from "./main";

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

    describe("redo", () => {
      it("should return a redo action creator", () => {
        expect(ActionCreators.redo()).toEqual({
          type: REDO,
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
});
