class Reducer {
  constructor(defaultValue) {
    if (!defaultValue) {
      throw new Error('defaultValue must not be undefined');
    }
    this.reducers = [];
    this.defaultValue = defaultValue;
  }

  reduce(actionFn, reducerFn) {
    this.reducers.push({
      // eslint-disable-next-line no-underscore-dangle
      actionType: actionFn.__jiveId,
      reducerFn,
    });
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
