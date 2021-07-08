
export { loginShowButtonProjector }

/**
 * 
 * @param {login} login-Model 
 * @returns {buttonElement}
 */
 const loginShowButtonProjector = login => {

  const inputElement = document.createElement('input')
  inputElement.type = 'button'
  inputElement.classList.add('secondary')
  inputElement.innerHTML = 'show'

  inputElement.onclick = () => {
    login.setPwVisibility(!login.getPwVisibility())
  }

  login.onPwVisibilityChanged( () => inputElement.value = login.getPwVisibility() ? 'hide' : 'show')

  return inputElement
}