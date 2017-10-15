const nonActions = [
  'constructor',
  'toString',
  'getAction',
  'actions',
  'registerActions',
  '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'valueOf',
  '__proto__',
  'toLocaleString',
];

function funcIsAction(functionName) {
  for (let i = 0; i < nonActions.length; i += 1) {
    if (functionName === nonActions[i]) {
      return false;
    }
  }
  return true;
}

function wrapAction(obj, actionName) {
  const originalMethod = obj[actionName];
  const constructorName = Object.getPrototypeOf(obj).constructor.name;
  const actionId = `${constructorName}.${actionName}`;

  const action = (...args) => ({
    type: actionId,
    payload: originalMethod.apply(obj, args),
  });

  action.__jiveId = actionId;
  // eslint-disable-next-line no-param-reassign
  obj[actionName] = action;
}

class Actions {
  constructor() {
    const actionNames = Actions.getAllActionFunctions(this.constructor.prototype);
    for (let i = 0; i < actionNames.length; i += 1) {
      const actionName = actionNames[i];
      wrapAction(this, actionName);
    }
  }

  static getAllActionFunctions(obj) {
    const allObjProperties = Object.getOwnPropertyNames(obj.constructor.prototype);
    return allObjProperties.filter(name => typeof obj[name] === 'function' && funcIsAction(name));
  }
}

export default Actions;
