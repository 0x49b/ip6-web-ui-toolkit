import { registerCriteriaProjector } from '../../subprojectors/criteriaProjector.js'

export { setupCriteria }

/**
 * 
 * @param {register} Register-Modell 
 * @param {rootElement} rootElement  
 * @returns {criteriaContainer} criteriaContainer
 */
const setupCriteria = (register, rootElement) => {

  const patterns = register.getPatterns()
  const criteriaElements = patterns.map(pattern => registerCriteriaProjector(register, pattern.name))

  const criteriaContainer = rootElement.querySelector('.pw-criteria')
  criteriaElements.forEach(element => criteriaContainer.appendChild(element))

  return criteriaContainer
}