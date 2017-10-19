import asyncMiddleware from './asyncMiddleware';

describe('asyncMiddleware', () => {
  it('should call the action result when action is a function', () => {
    // Arrange
    const middleWare = asyncMiddleware({ dispatch: {}, getState: {} });
    const next = () => {};
    let actionWasCalled = false;
    const action = () => {
      actionWasCalled = true;
    };

    // Act
    middleWare(next)(action);

    // Assert
    expect(actionWasCalled).toBe(true);
  });
  it('should call next when action is not a function', () => {
    // Arrange
    const middleWare = asyncMiddleware({ dispatch: {}, getState: {} });
    let nextWasCalled = false;
    const next = () => {
      nextWasCalled = true;
    };
    const action = {};

    // Act
    middleWare(next)(action);

    // Assert
    expect(nextWasCalled).toBe(true);
  });
});
