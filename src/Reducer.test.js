import Reducer from './Reducer';
import Actions from './Actions';

/* eslint-disable class-methods-use-this, no-useless-constructor */
class TestActions extends Actions {
  action1() {
    return 'test1';
  }
  action2() {
    return 'test2';
  }
  action3() {
    return 'test3';
  }
  asyncAction() {}
}

const testActions = new TestActions();

class TestReducer extends Reducer {
  constructor(defaultValue) {
    super(defaultValue);

    this.reduce(testActions.action1, this.handleAction1);
    this.reduce(testActions.action2, this.handleAction2);
    this.reduceAsync(
      testActions.asyncAction,
      this.handleBeforeAsync,
      this.handleAsyncSuccess,
      this.handleAsyncFailure,
    );
  }

  handleAction1(state, payload) {
    return `${payload}_new`;
  }
  handleAction2(state, payload) {
    return `${payload}_new2`;
  }
  handleBeforeAsync() {
    this.beforeCalled = true;
  }
  handleAsyncSuccess(data) {
    this.successData = data;
  }
  handleAsyncFailure(err) {
    this.asyncError = err;
  }
}
/* eslint-enable class-methods-use-this, no-useless-constructor  */

describe('Reducer', () => {
  it('throws an exception when no default value given', () => {
    // Act/Assert
    expect(() => new TestReducer()).toThrow();
  });
  it('registers reducers', () => {
    // Arrange/Act
    const testReducer = new TestReducer('test');

    // Assert
    expect(testReducer.reducers.length).toEqual(5);
    expect(testReducer.reducers[0]).toEqual({
      actionType: 'TestActions.action1',
      reducerFn: testReducer.handleAction1,
    });
    expect(testReducer.reducers[1]).toEqual({
      actionType: 'TestActions.action2',
      reducerFn: testReducer.handleAction2,
    });
    expect(testReducer.reducers[2]).toEqual({
      actionType: 'TestActions.asyncAction',
      reducerFn: testReducer.handleBeforeAsync,
    });
    expect(testReducer.reducers[3]).toEqual({
      actionType: 'TestActions.asyncAction_SUCCESS',
      reducerFn: testReducer.handleAsyncSuccess,
    });
    expect(testReducer.reducers[4]).toEqual({
      actionType: 'TestActions.asyncAction_ERROR',
      reducerFn: testReducer.handleAsyncFailure,
    });
  });
  describe('Built Reducer', () => {
    it('returns default value when state null', () => {
      // Arrange
      const reducer = new TestReducer('test').build();
      const action = testActions.action1();

      // Act
      const newState = reducer(undefined, action);

      // Assert
      expect(newState).toEqual('test');
    });
    it('returns new state when valid state', () => {
      // Arrange
      const reducer = new TestReducer('test').build();
      const action = testActions.action1();

      // Act
      const newState = reducer({}, action);

      // Assert
      expect(newState).toEqual('test1_new');
    });
    it('ignores other handlers and only executes necessary handler', () => {
      // Arrange
      const reducer = new TestReducer('test').build();
      const action = testActions.action2();

      // Act
      const newState = reducer({}, action);

      // Assert
      expect(newState).toEqual('test2_new2');
    });
    it('returns state when unknown action', () => {
      // Arrange
      const reducer = new TestReducer('test').build();
      const action = testActions.action3();

      // Act
      const newState = reducer('state', action);

      // Assert
      expect(newState).toEqual('state');
    });
  });
});
