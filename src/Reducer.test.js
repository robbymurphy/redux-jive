import Reducer from './Reducer';

class TestReducer extends Reducer {
  // eslint-disable-next-line no-useless-constructor
  constructor(defaultValue) {
    super(defaultValue);
  }

  // eslint-disable-next-line class-methods-use-this
  reduce1() {}
}

describe('Reducer', () => {
  it('must throw exception when no default value given', () => {
    // Act/Assert
    expect(() => new TestReducer()).toThrow();
  });
});
