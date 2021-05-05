
//! Login


// Used as an example for a successful login
const email = 'example@mail.com'
const pw    = 'P4$$word'

// HTML Elements
const loginForm               = document.querySelector('.login-form')
const loginBtn                = document.querySelector('.login-submit')
const notificationContainer   = document.querySelector('.login-validity-notification')
const notificationMessage     = document.querySelector('.login-validity-notification p')
const notificationIcon        = document.querySelector('.login-validity-notification i')
const emailNotification       = document.querySelector('.email-validity-notification')
const emailInput              = document.querySelector('#email')
const passwordInput           = document.querySelector('#password')
const showPwBtn               = document.querySelector('#show-pw-btn')

// Set disable state to a button
const disableButton = (btn, setDisable) => {
  if(setDisable) {
    btn.classList.add('disabled')
    btn.disabled = true
  } else {
    btn.classList.remove('disabled')
    btn.disabled = false
  }
}

// Specific function for button disabling/enabling if both input fields are valid
const handleBtnDisablingUponInputValidity = () => {

  // Check if both, pw has a value and email is valid and has a value and change disable state to loginBtn
  const isValid = (emailInput.checkValidity() && passwordInput.value !== '')
  disableButton(loginBtn, !isValid)
}

// Display successful/error notification message upon login
const showLoginNotification = (message, isSuccessful) => {
  notificationMessage.innerHTML = message
  notificationContainer.style.display = 'flex'
  notificationContainer.style.backgroundColor = isSuccessful 
    ? 'var(--success)' : 'var(--error)'
  notificationContainer.style.color = 'var(--background)'
  notificationIcon.classList.remove(
    isSuccessful ? 'fa-exclamation-circle' : 'fa-check-circle'
  )
  notificationIcon.classList.add(
    isSuccessful ? 'fa-check-circle': 'fa-exclamation-circle'
  )
}

// Reset states after a login attempt (except show button)
const resetAfterLogin = () => {
  emailInput.value = ''
  passwordInput.value = ''
  loginBtn.disabled = true
  loginBtn.classList.add('disabled')
}

// Toggle password input field type and change the show button text
const toggleShowBtn = () => {
  const isHidden = passwordInput.type === 'password'
  passwordInput.type = isHidden ? 'text' : 'password'
  showPwBtn.innerHTML = isHidden ? 'hide' : 'show'
}

// Handle login submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault() // Prevents the UI from refreshing after submit

  // Simulating a login attempt with preset credentials
  const successfulLogin = (passwordInput.value === pw && emailInput.value === email)
  const message = successfulLogin 
    ? 'Login successful!'
    : "Sorry, we couldn't match your request. Your E-Mail or Password must be wrong."

  showLoginNotification(message, successfulLogin)


  // After first login attempt, enable the "show" button
  const isDisabled = showPwBtn.classList.contains('disabled') ? true : false
  disableButton(showPwBtn, !isDisabled)

  // After a login attempt, clear the input fields and disable the login button again
  resetAfterLogin()
})

// Handle validation of the e-mail input field
emailInput.addEventListener('focusout', () => {
  if (!emailInput.value) return // Do nothing if input field is empty

  // Check if its valid or not and adjust the text
  const error = !emailInput.checkValidity()
  emailNotification.innerHTML = error ? 'Malformed Email' : ''
})

// Remove notification when user is focused on the email input field
emailInput.addEventListener('focusin', () => {
  emailNotification.innerHTML = ''
})

// Handle login button disabling/enabling upon typing on the email input field
emailInput.addEventListener('keyup', handleBtnDisablingUponInputValidity)

// Handle login button disabling/enabling upon typing on the password input field
passwordInput.addEventListener('keyup', handleBtnDisablingUponInputValidity)

// Handle show password button click
showPwBtn.addEventListener('click', () => {
  if (showPwBtn.classList.contains('disabled')) return // if disabled, do nothing

  // Toggle show button
  toggleShowBtn()
})