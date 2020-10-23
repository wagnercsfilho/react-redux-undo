### WHO TO USE

A simple Redux middleware that allows you to undo changes in the state.

### WHO TO USE

```jsx
import { applyMiddleware, createStore } from "redux";
import { ActionCreators, applyUndo, undoMiddeware } from "react-redux-undo";

const store = createStore(applyUndo(reducer), applyMiddleware(undoMiddeware()));

function App() {
  return (
    <Provider store={store}>
      <Count />
    </Provider>
  );
}

function Count() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
      <button onClick={() => dispatch(ActionCreators.undo())}>UNDO</button>
      <button onClick={() => dispatch(ActionCreators.clear())}>CLEAR</button>
    </div>
  );
}
```

#### License

MIT
