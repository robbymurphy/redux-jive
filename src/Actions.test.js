import Actions from './Actions';

/* eslint-disable class-methods-use-this */
class TestActions extends Actions {
  action1() {
    return 'test';
  }
  action2() {
    return 'test2';
  }
  asyncAction(promise) {
    return promise;
  }
}
/* eslint-enable class-methods-use-this */

describe('Actions', () => {
  it('assigns an id to all methods', () => {
    // Arrange
    const testActions = new TestActions();

    // Act/Assert
    expect(testActions.action1.__jiveId).toEqual('TestActions.action1');
    expect(testActions.action2.__jiveId).toEqual('TestActions.action2');
  });
  it('wraps all methods and returns action', () => {
    // Arrange
    const testActions = new TestActions();

    // Act
    const actionResult = testActions.action1();

    // Assert
    expect(actionResult).toEqual({
      type: 'TestActions.action1',
      payload: 'test',
    });
  });
  it('gets all action functions', () => {
    // Arrange
    const testActions = new TestActions();

    // Act
    const actionFunctions = Actions.getAllActionFunctions(testActions);

    // Assert
    expect(actionFunctions.length).toEqual(3);
    expect(actionFunctions[0]).toEqual('action1');
    expect(actionFunctions[1]).toEqual('action2');
    expect(actionFunctions[2]).toEqual('asyncAction');
  });
  it('dispatches async method events on success', (done) => {
    // Arrange
    const testActions = new TestActions();
    const dispatch = jest.fn();
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('asyncTest');
      }, 0);
    });
    const asyncAction = testActions.asyncAction(promise);

    // Act
    asyncAction(dispatch).then(() => {
      // Assert
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: 'TestActions.asyncAction', payload: null });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: 'TestActions.asyncAction_SUCCESS',
        payload: 'asyncTest',
      });
      done();
    });
  });
  it('dispatches async method events on error', (done) => {
    // Arrange
    const testActions = new TestActions();
    const dispatch = jest.fn();
    const error = new Error('asyncTest');
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(error);
      }, 0);
    });
    const asyncAction = testActions.asyncAction(promise);

    // Act
    asyncAction(dispatch).then(() => {
      // Assert
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: 'TestActions.asyncAction', payload: null });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: 'TestActions.asyncAction_ERROR',
        payload: error,
        error: true,
      });
      done();
    });
  });
});
