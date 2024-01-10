import anecdoteReducer from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("returns new state with action anecdotes/createAnecdote", () => {
    const state = [];
    const action = {
      type: "anecdotes/createAnecdote",
      payload: "This is a test anecdote",
    };

    // freeze state
    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState.map((s) => s.content)).toContainEqual(action.payload);
  });
});
