import combineReducers from './combineReducers';
import Reducer from './Reducer';

class TestReducer extends Reducer {
  constructor() {
    super('');
  }
}

describe('combineReducers', () => {
  it('does not throw when no reducers passed into parameter', () => {
    // Arrange/Act
    const reducers = combineReducers();

    // Assert
    expect(reducers).toEqual({});
  });
  it('combines reducers based on input', () => {
    // Arrange
    const reducerInput = {
      testReducer1: TestReducer,
      testReducer2: TestReducer,
    };

    // Act
    const reducer = combineReducers(reducerInput);

    // Assert
    expect(typeof reducer).toEqual('function');
  });
  it('combines reducers based on input with plain functions', () => {
    // Arrange
    const reducerInput = {
      testReducer1: TestReducer,
      testReducer2: () => {},
    };

    // Act
    const reducer = combineReducers(reducerInput);

    // Assert
    expect(typeof reducer).toEqual('function');
  });
});
