import { registerCriteriaProjector } from '../../subprojectors/criteriaProjector.js'

export { setupCriteria }

/**
 * 
 * @param {register} Register-Modell 
 * @param {rootElement} rootElement  
 * @returns {criteriaContainer} criteriaContainer
 */
const setupCriteria = (register, rootElement) => {

  const patterns = register.getPatterns().slice(0, -1)  // Removing the 8 Chars criteria, since we dont want it to be displayed on the UI. (Not using pop() because it mutates the patterns array)
  const criteriaElements = patterns.map(pattern => registerCriteriaProjector(register, pattern.name))

  const criteriaContainer = rootElement.querySelector('.pw-criteria')
  criteriaElements.forEach(element => criteriaContainer.appendChild(element))

  return criteriaContainer
}