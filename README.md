# redux-jive
Helpers for redux wiring

[![Build Status](https://travis-ci.org/robbymurphy/redux-jive.svg?branch=master)](https://travis-ci.org/robbymurphy/redux-jive) [![Coverage Status](https://coveralls.io/repos/github/robbymurphy/redux-jive/badge.svg)](https://coveralls.io/github/robbymurphy/redux-jive) [![Dependency Status](https://david-dm.org/robbymurphy/redux-jive.svg)](https://david-dm.org/robbymurphy/redux-jive) [![devDependency Status](https://david-dm.org/robbymurphy/redux-jive/dev-status.svg)](https://david-dm.org/robbymurphy/redux-jive#info=devDependencies)

## Goal
The goal of this library is to remove the necessity for boilerplate code in redux projects.  Secondarily, the library aims to group actions and reducers and more tightly couple them.

## Examples

### Actions
```javascript
import { Actions } from 'redux-jive';

// action classes extend the Actions base class
class TodoActions extends Actions {
  // creates action { type: 'TodoActions.add', payload: todo }
  add(todo) {
    return todo;
  }

  markDone(todo) {
    return todo;
  }
}

// actions are singletons
export default new TodoActions();
```
Extending the Actions base class wraps each of the action methods and creates the action object by convention from the name of the class and the method name.

### Reducer
```javascript
import { Reducer } from 'redux-jive';
import todoActions from './todoActions';

export class TodoReducer extends Reducer {
  constructor() {
    // provide a default state value of empty array
    super([]);

    // connect the actions with the reducer functions
    reduce(todoActions.add, this.handleAdd);
    reduce(todoActions.markDone, this.handleMarkDone);
  }

  // payload here is the todo that was added
  handleAdd(state, payload) {
    return [...state, payload];
  }

  handleMarkDone(state, payload) {
    return state.map(todo =>
      (todo.id === payload.id) 
        ? {...todo, completed: !todo.completed}
        : todo
    );
  }
}
```

### Combining
```javascript
import { combineReducers } from 'redux-jive';
import TodoReducer from './TodoReducer';

// classical-style reducer functions can also be mixed in to the app
const adHocReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MY_OTHER_ACTION':
      return {new: true, ...state};
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos: TodoReducer,
  adHoc: adHocReducer
});

export default todoApp;
```
