import { registerStrengthLineProjector } from '../../subprojectors/strengthLineProjector.js'

export { initStrengthLines }

const BGRED    = 'line-bg-red'
const BGORANGE = 'line-bg-orange'
const BGGREEN  = 'line-bg-green'

/**
 * 
 * @param {register} register-model 
 * @param {rootElement} rootElement - Rootelement where we append all elements 
 * @returns 
 */
const initStrengthLines = (register, rootElement) => {
  let strengthLines = Array.from('x'.repeat(6))  // Create an array with a length of 6

  strengthLines = strengthLines.map(line => registerStrengthLineProjector(register)) // Fill the array with strengthlineElements

  // Get the div container from DOM and append all strengthlines to it
  const strengthLinesContainer = rootElement.querySelector('.strength-lines')
  strengthLines.forEach(line => strengthLinesContainer.appendChild(line))

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
    if(pwStrength > 1 && pwStrength < 6)  color = BGORANGE
    if(pwStrength === 6)                  color = BGGREEN;

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