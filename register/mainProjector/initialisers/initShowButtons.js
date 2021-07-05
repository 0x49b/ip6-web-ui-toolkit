import { registerShowButtonProjector } from '../../subprojectors/showButtonProjector.js'

export { initShowButtons }

/**
 * 
 * @param {register} register-model 
 * @param {passwordInputElement} passwordInputElement 
 * @param {confirmPasswordInputElement} confirmPasswordInputElement 
 * @returns Show- and Confirm Pasword Button
 */
const initShowButtons = (register, passwordInputElement, confirmPasswordInputElement) => {
  const showPasswordButton = registerShowButtonProjector(register)
  const showConfirmPasswordButton = registerShowButtonProjector(register)

  showPasswordButton.onclick = () => passwordInputElement.focus()
  showConfirmPasswordButton.onclick = () => confirmPasswordInputElement.focus()

  return {
    showPasswordButton,
    showConfirmPasswordButton
  }
}