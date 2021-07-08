import { registerButtonProjector }  from '../subprojectors/buttonProjector.js'

import { setupInputElements }        from './setups/setupInputElements.js'
import { setupShowButtons }          from './setups/setupShowButtons.js'
import { setupNotificationElements } from './setups/setupNotificationElements.js'
import { setupStrengthLines }        from './setups/setupStrengthLines.js'
import { setupCriterias }            from './setups/setupCriterias.js'

export { registerProjector }


/**
 * 
 * @param {registerController} registerController  
 * @param {rootElement} rootElement - root Element which is used to append element
 * @param {register} register-model
 */
const registerProjector = (registerController, rootElement, register) => {

  // -------------Register Button-------------
  const registerButton = registerButtonProjector(register)


  // -------------Input Elements-------------
  const {
    emailInputElement,
    emailLabelElement,
    passwordInputElement,
    passwordLabelElement,
    confirmPasswordInputElement,
    confirmPasswordLabelElement,
  } = setupInputElements(register)


  // -------------Show Password Buttons-------------
  const {
    showPasswordButton,
    showConfirmPasswordButton
  } = setupShowButtons(register, passwordInputElement, confirmPasswordInputElement)


  // -------------Notifications-------------
  const {
    emailValidityNotificiation,
    passwordStrengthNotification,
    confirmPwMatchNotification
  } = setupNotificationElements(register, emailInputElement)


  // -------------Strength Lines-------------
  const strengthLinesContainer = setupStrengthLines(register, rootElement)


  // -------------Criterias-------------
  const criteriaContainer = setupCriterias(register, rootElement)


  // -------------Setting up the HTML-------------
  rootElement.appendChild(emailLabelElement)
  rootElement.appendChild(emailInputElement)
  rootElement.appendChild(emailValidityNotificiation)
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(passwordLabelElement)
  rootElement.appendChild(passwordInputElement)
  rootElement.appendChild(showPasswordButton)
  rootElement.appendChild(strengthLinesContainer)
  rootElement.appendChild(passwordStrengthNotification)
  rootElement.appendChild(criteriaContainer)  
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(confirmPasswordLabelElement)
  rootElement.appendChild(confirmPasswordInputElement)
  rootElement.appendChild(showConfirmPasswordButton)
  rootElement.appendChild(confirmPwMatchNotification)
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(registerButton)
}