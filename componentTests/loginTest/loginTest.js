import { Suite } from '../../test/test.js'
import kolibri from '../../script.js'
import { fireEvent } from '../../test/testUtils/events.js'

// Setting up Suite
const LoginSuite = Suite('LoginSuite')

// Setting up Login context
const loginContext = document.querySelector('.login')
kolibri.login(loginContext)


// declaring html elements
const loginTitle                = loginContext.querySelector('h2')
const emailInputField           = loginContext.querySelector('#email')
const passwordInputField        = loginContext.querySelector('#password')
const loginBtn                  = loginContext.querySelector('.login-submit')
const showBtn                   = loginContext.querySelector('#show-pw-btn')
const loginNotification         = loginContext.querySelector('.login-validity-notification')
const emailValidityNotification = loginContext.querySelector('.email-validity-notification')

const message                   = loginNotification.querySelector('p')




// Tests
LoginSuite.add("Login dialog has title equal Login", assert => {
  assert.is(loginTitle.innerHTML, "Login")
})


LoginSuite.add("email input field does not validate incorrect mail", assert => {
  emailInputField.value = 'examplemail.com'

  fireEvent(emailInputField, 'change')
  fireEvent(emailInputField, 'focusout')  

  assert.is(emailValidityNotification.innerHTML, "Malformed Email")
  assert.true(!emailInputField.checkValidity())
})



LoginSuite.add("email input field validates correct mail", assert => {
  emailInputField.value = 'example@mail.com'

  fireEvent(emailInputField, 'change')

  assert.true(emailInputField.checkValidity())
})



LoginSuite.add("login button enables when email and pw field are valid", assert => {
  emailInputField.value = 'example@mail.com'
  passwordInputField.value = 'somePassword'

  fireEvent(emailInputField, 'change')
  fireEvent(passwordInputField, 'keyup')
  fireEvent(emailInputField, 'focusout')

  assert.true(!loginBtn.disabled)
})



LoginSuite.add("after first failed login attempt, show button gets enabled", assert => {
  assert.true(showBtn.classList.contains('disabled'))

  loginBtn.click()

  assert.true(!showBtn.classList.contains('disabled'))
})



LoginSuite.add("after first failed login attempt, login button gets disabled", assert => {
  assert.true(loginBtn.disabled)
})



LoginSuite.add("after first failed login attempt, user gets notified", assert => {
  assert.isNot(loginNotification.style.display, 'none')

  assert.is(message.innerHTML, "Sorry, we couldn't match your request. Your E-Mail or Password must be wrong.")
})



LoginSuite.add("after successful login, user gets notified", assert => {
  emailInputField.value = 'example@mail.com'

  passwordInputField.value = 'P4$$word'

  fireEvent(emailInputField, 'change')
  fireEvent(passwordInputField, 'keyup')
  fireEvent(emailInputField, 'focusout')

  loginBtn.click()

  assert.isNot(loginNotification.style.display, 'none')
  assert.is(message.innerHTML, 'Login successful!')
})



LoginSuite.run()