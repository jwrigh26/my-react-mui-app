/**
 * Safely parse a json string - meaning, if the json is invalid, this function will
 * catch the error and instead return the fallbackValue or undefined
 * @param  {String} jsonString    The json string
 * @param  {Any} fallbackValue Optional. If given, will return this value if the json is invalid (or will return undefined if no provided)
 * @return {Any}               Returns either the parsed json or the fallbackValue or undefined
 */
export default (jsonString, fallbackValue) => {
  if(!jsonString){//preemtively handle empty json string
    console.log('jsonString is empty')
    return fallbackValue
  }
  try {
    return JSON.parse(jsonString)
  }
  catch (e) {
    console.error('Error parsing JSON', e)
    return fallbackValue
  }
}
