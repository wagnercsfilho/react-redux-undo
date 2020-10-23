### React Redux Undo

A simple Redux middleware that allows you to undo changes in the state.

#### Install

```
npm install react-redux-undo
```

#### Who to use

```jsx
import { applyMiddleware, createStore } from "redux";
import { ActionCreators, applyUndo, undoMiddleware } from "react-redux-undo";

const store = createStore(applyUndo(reducer), applyMiddleware(undoMiddleware()));

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

#### Passing custom props

Defines a maximum size of the history stack

```js
undoMiddleware({ maxHistory: 10 });
```

#### Example

[Check an example](https://codesandbox.io/s/funny-solomon-9tv78)

#### License

MIT
