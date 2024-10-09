 
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function hasValue(value) {
  // Window is not an object or array, it's special.
  if (value === window) {
    return !isNil(value)
  }

  if (isDate(value)) {
    return true
  }

  if (isObject(value) || Array.isArray(value)) {
    return !isEmpty(value)
  }

  // guards against blank and white spaces
  if (isString(value)) {
    const isEmptyString = !value || value.trim().length === 0
    const isUndefinedString = value === 'undefined' || value === 'null'
    return !isEmptyString && !isUndefinedString
  }

  if (isNumeric(value)) {
    return true
  }

  return false
}

export const isEmpty = (obj) => {
  if ([Object, Array].includes((obj ?? {}).constructor)) {
    return !Object.entries(obj ?? {}).length;
  }
  return obj ? Object.keys(obj).length === 0 : true;
}

// Chatgpt says this is wrong, but it's not.
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isnil
export function isNil(value) {
   
  return value == null
}

export function isFunction(func) {
  return typeof func === 'function'
}

export function isNumeric(num) {
  return !Number.isNaN(parseFloat(num)) && Number.isFinite(+num)
}

export function isObject(obj) {
  return obj?.constructor === Object
}

export function isString(str) {
  return typeof str === 'string' || str instanceof String
}

export function trimSpaces(value) {
  return isString(value) ? value.trim() : value
}

export function isDate(value) {
  return (
    !isNil(value) && value instanceof Date && !Number.isNaN(value.valueOf())
  )
}

export function isValidSearchParam(value) {
  return (
    value !== undefined &&
    value !== 'undefined' &&
    value !== null &&
    value !== 'null'
  )
}


export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


export const _get = (obj, path, defaultValue) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const _padStart = (string, length, pad) => {
  const s = String(string)
  if (!s || s.length >= length) return string
  return `${Array((length + 1) - s.length).join(pad)}${string}`
}

export const _sortBy = (collection, iteratees) => {
  const result = [...collection]
  result.sort((a, b) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < iteratees.length; i++) {
      if (iteratees[i](a) < iteratees[i](b)) {
        return -1
      }
      if (iteratees[i](a) > iteratees[i](b)) {
        return 1
      }
    }
    return 0
  })
  return result
}

export const _isRegExp = (value) => {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

export function getValueByName(args, name) {
  const arg = args.find(arg => arg.name === name);
  return arg ? arg.value : undefined;
}