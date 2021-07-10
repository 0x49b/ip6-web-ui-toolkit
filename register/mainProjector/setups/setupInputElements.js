import { registerEmailProjector } from '../../subprojectors/emailProjector.js'
import { registerPasswordProjector } from '../../subprojectors/passwordProjector.js'

export { setupInputElements }

/**
 * 
 * @param {register} register-modell 
 * @returns {Object} input-elements with labels
 */
const setupInputElements = register => {
  const [ 
    emailInputElement, 
    emailLabelElement 
  ] = registerEmailProjector(register, 'Email')


  const [ 
    passwordInputElement, 
    passwordLabelElement 
  ] = registerPasswordProjector(register, 'Password')

  passwordInputElement.placeholder = 'P4$$word'

  passwordInputElement.oninput = () => register.setPassword(passwordInputElement.value)

  register.onPasswordChanged( () => passwordInputElement.value = register.getPassword() )

  
  const [ 
    confirmPasswordInputElement, 
    confirmPasswordLabelElement 
  ] = registerPasswordProjector(register, 'Confirm Password (optional)')

  confirmPasswordInputElement.placeholder = 'P4$$word'

  confirmPasswordInputElement.oninput = () => register.setConfirmPassword(confirmPasswordInputElement.value)

  register.onConfirmPasswordChanged( () => confirmPasswordInputElement.value = register.getConfirmPassword() )


  return {
    emailInputElement,
    emailLabelElement,
    passwordInputElement,
    passwordLabelElement,
    confirmPasswordInputElement,
    confirmPasswordLabelElement,
  }
}

const setValidityClass = (element, valid) => {

  if(null === valid) {
    element.classList.remove('valid')
    element.classList.remove('invalid')
    return
  }

  if(valid) {
    element.classList.add('valid')
    element.classList.remove('invalid')
  } else {
    element.classList.remove('valid')
    element.classList.add('invalid')
  }
}