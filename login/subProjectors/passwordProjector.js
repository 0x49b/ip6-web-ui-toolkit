
export { loginPasswordProjector }

/**
 * 
 * @param {Login} login-Model 
 * @param {String} label-String
 * @returns {{InputElement | LabelElement}}
 */
 const loginPasswordProjector = (login, label) => {

  const inputElement = document.createElement('input')
  inputElement.type = 'password'
  inputElement.id = label.toLowerCase()
  inputElement.placeholder = 'P4$$word'

  const labelElement = document.createElement('label')
  labelElement.htmlFor = label.toLowerCase()
  labelElement.innerHTML = label

  inputElement.oninput = () => login.setPassword(inputElement.value)

  login.onPasswordChanged( () => inputElement.value = login.getPassword() )

  login.onPwVisibilityChanged( () => inputElement.type = login.getPwVisibility() ? 'text' : 'password' )

  return [ inputElement, labelElement ]
}