import { Observable } from '../observable/observable.js'

const VALUE = 'value'
const VALID = 'valid'
const VISIBILITY = 'visibility'

const Attribute = value => {
  const observables = {}

  const hasObs = name => observables.hasOwnProperty(name)

  const getObs = (name, initValue = null) => 
    hasObs(name)
      ? observables[name]
      : observables[name] = Observable(initValue)

  getObs('value', value)

  let convert = id => id
  const setConverter = converter => {
    convert = converter
    setConvertedValue(value)
  }
  const setConvertedValue = val => getObs(VALUE).setValue(convert(val))

  const setValidator = validate => getObs(VALUE).onChange( val => getObs(VALID).setValue(validate(val)));

  return { getObs, hasObs, setValidator, setConverter, setConvertedValue }
}

export { Attribute, VALID, VALUE, VISIBILITY }