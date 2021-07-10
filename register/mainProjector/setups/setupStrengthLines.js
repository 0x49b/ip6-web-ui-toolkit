import { registerStrengthLineProjector } from '../../subprojectors/strengthLineProjector.js'
import { containerProjector } from '../../../utilProjectors/containerProjector.js'

export { setupStrengthLines }

const BGRED    = 'line-bg-red'
const BGORANGE = 'line-bg-orange'
const BGGREEN  = 'line-bg-green'

/**
 * 
 * @param {register} register-model 
 * @param {rootElement} rootElement - Rootelement where we append all elements 
 * @returns 
 */
const setupStrengthLines = (register, rootElement) => {
  let strengthLines = Array.from('x'.repeat(5))  // Create an array with a length of 6

  strengthLines = strengthLines.map(line => registerStrengthLineProjector(register)) // Fill the array with strengthlineElements

  // Get the div container from DOM and append the strengthlines box to it
  const strengthLinesContainer = rootElement.querySelector('.strength-lines')
  const strengthLinesBox = containerProjector(strengthLines, 'strengthlines-box')
  strengthLinesContainer.appendChild(strengthLinesBox)

  // Adding a placeholder for styling reasons (alignment of strengthlines to the input field)
  const placeholderElement = containerProjector([], 'placeholder')
  strengthLinesContainer.appendChild(placeholderElement)

  coloriseStrengLines(register, strengthLines)

  return strengthLinesContainer
}

/**
 * 
 * @param {register} register-model 
 * @param {strengthLines} strengthLines
 * @description Used to colorise strength lines based on password strength
 */
const coloriseStrengLines = (register, strengthLines) => {
  register.onPasswordChanged( () => {
    const pwStrength = register.getPwStrength()

    resetBackgroundColors(strengthLines)

    let color = BGRED
    if(pwStrength > 1 && pwStrength < 5)  color = BGORANGE
    if(pwStrength === 5)                  color = BGGREEN;

    [...strengthLines].slice(0, pwStrength).forEach(line => line.classList.add(color))
  })
}

/**
 * 
 * @param {strengthLines} strengthLines 
 */
const resetBackgroundColors = strengthLines => {
  [...strengthLines].forEach(line => line.classList.remove(BGRED));
  [...strengthLines].forEach(line => line.classList.remove(BGORANGE));
  [...strengthLines].forEach(line => line.classList.remove(BGGREEN))
}