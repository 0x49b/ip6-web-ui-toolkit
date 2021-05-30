import { Suite } from '../../test/test.js'
import kolibri from '../../script.js'
import { fireEvent } from '../../test/testUtils/events.js'
import { setInputValue } from '../../test/testUtils/setInputValue.js'

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


// Util functions for repetitive tasks specific for Tests in this Suite
// #NONE so far


// Tests
LoginSuite.add("Login dialog has title equal Login", assert => {
  assert.is(loginTitle.innerHTML, "Login")
})


LoginSuite.add("email input field does not validate incorrect mail", assert => {
  setInputValue(emailInputField, 'examplemail.com')  

  assert.is(emailValidityNotification.innerHTML, "Malformed Email")
  assert.true(!emailInputField.checkValidity())
})



LoginSuite.add("email input field validates correct mail", assert => {
  setInputValue(emailInputField, 'example@mail.com') 

  assert.true(emailInputField.checkValidity())
})



LoginSuite.add("login button enables when email and pw field are valid", assert => {
  setInputValue(emailInputField, 'some@mail.com')
  setInputValue(passwordInputField, 'somePassword')

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
  setInputValue(emailInputField, 'example@mail.com')
  setInputValue(passwordInputField, 'P4$$word')

  loginBtn.click()

  assert.isNot(loginNotification.style.display, 'none')
  assert.is(message.innerHTML, 'Login successful!')
})



LoginSuite.run()