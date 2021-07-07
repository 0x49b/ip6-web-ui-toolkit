
export { loginProjector }


/**
 * 
 * @param {loginController} loginController 
 * @param {rootElement} rootElement 
 * @param {login} login-Modell 
 */
const loginProjector = (loginController, rootElement, login) => {

  const loginButton = document.createElement('input')
  loginButton.type = 'submit'
  loginButton.value = 'Login'
  loginButton.classList.add('primary')

  loginButton.onclick = (event) => {
    event.preventDefault()
    
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

  const titleElement = document.createElement('h2')
  titleElement.innerHTML = 'Login'

  const [ emailInputElement, emailLabelElement ] = loginTextProjector(login, 'Email')
  const [ passwordInputElement, passwordLabelElement ] = loginPasswordProjector(login, 'Password')

  const emailValidNotificationElement = loginEmailValidNotification(login, emailInputElement)

  const emailInputContainer = document.createElement('div')
  emailInputContainer.id = 'emailInputContainer'

  const showButtonElement = loginShowButtonProjector(login)

  const passwordInputContainer = document.createElement('div')
  passwordInputContainer.id = 'passwordInputContainer'

  const forgotLinkElement = document.createElement('a')
  forgotLinkElement.innerHTML = 'Forgot email or password?'

  const notificationElement = loginNotificationProjector(login)

  login.onFormValidityChanged(
    valid => valid
      ? loginButton.disabled = false
      : loginButton.disabled = true
  )

  login.onPwVisibilityChanged( () => passwordInputElement.type = login.getPwVisibility() ? 'text' : 'password' )

  

  const formElement = document.createElement('form')

  rootElement.appendChild(titleElement)
  rootElement.appendChild(formElement)

  formElement.appendChild(notificationElement)
  formElement.appendChild(emailLabelElement)
  
  emailInputContainer.appendChild(emailInputElement)
  emailInputContainer.appendChild(emailValidNotificationElement)

  formElement.appendChild(emailInputContainer)
  formElement.appendChild(passwordLabelElement)

  passwordInputContainer.appendChild(passwordInputElement)
  passwordInputContainer.appendChild(showButtonElement)

  formElement.appendChild(passwordInputContainer)
  formElement.appendChild(forgotLinkElement)
  formElement.appendChild(loginButton)
}


/**
 * 
 * @param {Login} login 
 * @param {Label} label
 * @returns {{inputElement | labelElement}} 
 */
const loginTextProjector = (login, label) => {

  const inputElement = document.createElement('input')
  inputElement.type = 'email'
  inputElement.id   = label.toLowerCase()
  inputElement.placeholder = 'example@mail.com'

  const labelElement = document.createElement('label')
  labelElement.htmlFor = label.toLowerCase()
  labelElement.innerHTML = label
  
  inputElement.onchange = () => login.setEmail(inputElement.value)

  inputElement.addEventListener('change', () => {

    if(login.getEmailValidity()){
      inputElement.classList.add('valid')
      inputElement.classList.remove('invalid')
    } else {
      inputElement.classList.remove('valid')
      inputElement.classList.add('invalid')
    }

    // Reset classes when input field is empty
    if(!login.getEmail()) {
      inputElement.classList.remove('valid')
      inputElement.classList.remove('invalid')
    }
  })

  login.onEmailChanged( () => inputElement.value = login.getEmail() )

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
  inputElement.placeholder = 'P4$$word'

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


/**
 * 
 * @param {Login} login-Modell 
 * @returns {pElement}
 */
const loginNotificationProjector = login => {

  const pElement = document.createElement('p')
  pElement.id = 'loginNotification'

  login.onLoginSuccessChanged( () => {

    if(login.getLoginSuccess()) {
      login.setNotification('Logged in successfully!')
      pElement.classList.add('success')
    } else if(login.getPassword()){ // Checking if pw has value, because the onLoginSuccessChanged gets called immediately, therefore setting notification even without any input.
      login.setNotification('Sorry we could not process your login attempt')
      pElement.classList.remove('success')
    } else {
      login.setNotification('')
      pElement.classList.remove('success')
    }
  })

  login.onNotificationChanged( () => pElement.innerHTML = login.getNotification())

  return pElement
}


const loginEmailValidNotification = (login, emailInputElement) => {

  const pElement = document.createElement('p')

  emailInputElement.addEventListener('change', () => {

    if(!login.getEmail()) return pElement.innerHTML = ''

    login.getEmailValidity() 
      ? pElement.innerHTML = ''
      : pElement.innerHTML = 'Malformed Email'
  })

  return pElement
}