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
    /* eslint-disable no-unused-expressions */
    reduceBeforeFn &&
      this.reducers.push({
        actionType: asyncActionFn.__jiveId,
        reducerFn: reduceBeforeFn,
      });
    reduceSuccessFn &&
      this.reducers.push({
        actionType: `${asyncActionFn.__jiveId}_SUCCESS`,
        reducerFn: reduceSuccessFn,
      });
    reduceErrorFn &&
      this.reducers.push({
        actionType: `${asyncActionFn.__jiveId}_ERROR`,
        reducerFn: reduceErrorFn,
      });
    /* eslint-enable no-unused-expressions */
  }

  build() {
    const { reducers, defaultValue } = this;
    return (state, action) => {
      let newState = state;
      for (let i = 0; i < reducers.length; i += 1) {
        const reducer = reducers[i];
        if (action.type === reducer.actionType) {
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
