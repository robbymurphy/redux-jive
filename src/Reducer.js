class Reducer {
  constructor(defaultValue) {
    if (defaultValue === undefined) {
      throw new Error('defaultValue must not be undefined');
    }
    this.reducers = [];
    this.defaultValue = defaultValue;
  }

  reduce(actionFn, reducerFn) {
    this.reducers.push({
      actionType: actionFn.__jiveId,
      reducerFn,
    });
  }

  reduceAsync(asyncActionFn, reduceBeforeFn, reduceSuccessFn, reduceErrorFn) {
    this.reducers.push(
      {
        actionType: asyncActionFn.__jiveId,
        reducerFn: reduceBeforeFn,
      },
      {
        actionType: `${asyncActionFn.__jiveId}_SUCCESS`,
        reducerFn: reduceSuccessFn,
      },
      {
        actionType: `${asyncActionFn.__jiveId}_ERROR`,
        reducerFn: reduceErrorFn,
      },
    );
  }

  build() {
    const { reducers, defaultValue } = this;
    return (state, action) => {
      let newState = state;
      for (let i = 0; i < reducers.length; i += 1) {
        const reducer = reducers[i];
        if (reducer.reducerFn && action.type === reducer.actionType) {
          newState = reducer.reducerFn(newState, action.payload);
        } else if (state === undefined) {
          newState = defaultValue;
        }
      }
      return newState;
    };
  }
}

export default Reducer;
