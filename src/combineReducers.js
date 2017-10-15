import { combineReducers } from 'redux';
import Reducer from './Reducer';

export default function (reducers) {
  const reducer = {};
  const objKeys = Object.keys(reducers);
  for (let i = 0; i < objKeys.length; i += 1) {
    const key = objKeys[i];
    const ReducerTemp = reducers[key];
    const reducerFunc =
      ReducerTemp.prototype instanceof Reducer ? new ReducerTemp().build() : ReducerTemp;
    reducer[key] = reducerFunc;
  }
  return combineReducers(reducer);
}
