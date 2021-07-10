import { toggleColor } from '../utils/toggleColor.js'
import { toggleIconClass } from "../utils/toggleIconClass.js";

export { registerCriteriaProjector }

/**
 * 
 * @param {register} register-model ;
 * @param {string} label-string element 
 * @returns pElement
 */
const registerCriteriaProjector = (register, label) => {

  const pElement    = document.createElement('p')
  const spanElement = document.createElement('div')

  pElement.classList.add(label.replace(/ /g, '')) // Remove whitespaces to add class 
  spanElement.classList.add('cross-default')

  pElement.appendChild(spanElement)
  pElement.innerHTML = `
    <span></span>
    ${label}
  `
  pElement.querySelector('span').replaceWith(spanElement)

  register.onPatternsChanged( patterns => {

    const thisPattern = patterns.filter(pattern => pattern.name === label)[0]

    if(!register.getPassword()) { // If Password field is empty, reset all colors and icons
      toggleColor(pElement, null)
      toggleIconClass(spanElement, null)
      return
    }

    // Set color according to the fulfilled status
    toggleColor(pElement, thisPattern.isFulfilled)
    toggleIconClass(spanElement, thisPattern.isFulfilled)
  })

  return pElement
}