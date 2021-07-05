export { loginProjector }

/**
 * 
 * @param {loginController} loginController 
 * @param {rootElement} rootElement 
 * @param {login} login-Modell 
 */
const loginProjector = (loginController, rootElement, login) => {
  const loginButton = document.createElement('button')
  loginButton.innerHTML = 'Login'

  loginButton.onclick = () => {
    
    login.onLogin(emailInputElement.value, passwordInputElement.value)
      .then(result => {
        result.token // Response should contain a token if login was successful
          ? login.setLoginSuccess(true)
          : login.setLoginSuccess(false)
      })
      .catch(err => {
        login.setLoginSuccess(false)
      })
  }

  const [ emailInputElement, emailLabelElement ] = loginTextProjector(login, 'Email')
  const [ passwordInputElement, passwordLabelElement ] = loginPasswordProjector(login, 'Password')

  const showButtonElement = loginShowButtonProjector(login)

  const notificationElement = loginNotificationProjector(login)

  login.onFormValidityChanged(
    valid => valid
      ? loginButton.classList.remove('disabled')
      : loginButton.classList.add('disabled')
  )

  login.onPwVisibilityChanged( () => passwordInputElement.type = login.getPwVisibility() ? 'text' : 'password' )

  rootElement.appendChild(notificationElement)
  rootElement.appendChild(emailLabelElement)
  rootElement.appendChild(emailInputElement)
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(passwordLabelElement)
  rootElement.appendChild(passwordInputElement)
  rootElement.appendChild(showButtonElement)
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(loginButton)
}

/**
 * 
 * @param {Login} login 
 * @param {Label} label
 * @returns {{inputElement | labelElement}} 
 */
const loginTextProjector = (login, label) => {

  const inputElement = document.createElement('input')
  inputElement.type = 'text'
  inputElement.id   = label.toLowerCase()

  const labelElement = document.createElement('label')
  labelElement.htmlFor = label.toLowerCase()
  labelElement.innerHTML = label
  
  inputElement.oninput = () => login.setEmail(inputElement.value)

  login.onEmailChanged( () => inputElement.value = login.getEmail() )

  login.onEmailValidityChanged(
    valid => valid
      ? inputElement.classList.add('valid')
      : inputElement.classList.remove('valid')
  )

  return [ inputElement, labelElement ]
}

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

  const labelElement = document.createElement('label')
  labelElement.htmlFor = label.toLowerCase()
  labelElement.innerHTML = label

  inputElement.oninput = () => login.setPassword(inputElement.value)

  login.onPasswordChanged( () => inputElement.value = login.getPassword() )

  return [ inputElement, labelElement ]
}


/**
 * 
 * @param {login} login-Model 
 * @returns {buttonElement}
 */
const loginShowButtonProjector = login => {

  const buttonElement = document.createElement('button')
  buttonElement.innerHTML = 'show'

  buttonElement.onclick = () => {
    login.setPwVisibility(!login.getPwVisibility())
  }

  login.onPwVisibilityChanged( () => buttonElement.innerHTML = login.getPwVisibility() ? 'hide' : 'show')

  return buttonElement
}
/**
 * 
 * @param {Login} login-Modell 
 * @returns {pElement}
 */
const loginNotificationProjector = (login) => {

  const pElement = document.createElement('p')

  login.onLoginSuccessChanged( () => 
    login.getLoginSuccess() 
      ? login.setNotification('Logged in successfully!')
      : login.getPassword()  // Checking if pw has value, because the onLoginSuccessChanged gets called immediately, therefore setting notification even without any input.
        ? login.setNotification('Sorry we could not process your login attempt')
        : login.setNotification('')
  )

  login.onNotificationChanged( () => pElement.innerHTML = login.getNotification())

  return pElement
}