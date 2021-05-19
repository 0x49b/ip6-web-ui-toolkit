import { Suite } from '../../test/test.js'
import kolibri from '../../script.js'

const LoginSuite = Suite('LoginSuite')

LoginSuite.add("Login dialog has title equal Login", assert => {

  const loginContainer = document.querySelector('.login')

  kolibri.login(loginContainer)

  const loginTitle = document.querySelector('h2')

  assert.is(loginTitle.innerHTML, "Login")
})

LoginSuite.add("email input field does not validate incorrect mail", assert => {
  const emailInputField = document.getElementById('email')
  emailInputField.value = 'examplemail.com'

  const changeEvent = new Event('change')
  const focusOutEvent = new Event('focusout')

  emailInputField.dispatchEvent(changeEvent)
  emailInputField.dispatchEvent(focusOutEvent)

  const emailValidityNotification = document.querySelector('.email-validity-notification')

  assert.is(emailValidityNotification.innerHTML, "Malformed Email")
  assert.true(!emailInputField.checkValidity())
})

LoginSuite.add("email input field validates correct mail", assert => {
  const emailInputField = document.getElementById('email')
  emailInputField.value = 'example@mail.com'

  const changeEvent = new Event('change')

  emailInputField.dispatchEvent(changeEvent)

  assert.true(emailInputField.checkValidity())
})

LoginSuite.add("login button enables when email and pw field are valid", assert => {
  const emailInputField = document.getElementById('email')
  emailInputField.value = 'example@mail.com'

  const passwordInputField = document.getElementById('password')
  passwordInputField.value = 'somePassword'

  const changeEvent = new Event('change')
  const focusOutEvent = new Event('focusout')

  emailInputField.dispatchEvent(changeEvent)
  passwordInputField.dispatchEvent(changeEvent)
  emailInputField.dispatchEvent(focusOutEvent)

  const loginBtn = document.querySelector('.login-submit')

  assert.true(!loginBtn.disabled)
})

LoginSuite.add("after first failed login attempt, show button gets enabled", assert => {
  const loginBtn = document.querySelector('.login-submit')

  const showBtn = document.getElementById('show-pw-btn')

  assert.true(showBtn.classList.contains('disabled'))

  loginBtn.click()

  assert.true(!showBtn.classList.contains('disabled'))
})

LoginSuite.add("after first failed login attempt, login button gets disabled", assert => {
  const loginBtn = document.querySelector('.login-submit')

  assert.true(loginBtn.disabled)
})

LoginSuite.add("after first failed login attempt, user gets notified", assert => {
  const loginNotification = document.querySelector('.login-validity-notification')
  assert.isNot(loginNotification.style.display, 'none')

  const message = loginNotification.querySelector('p')
  assert.is(message.innerHTML, "Sorry, we couldn't match your request. Your E-Mail or Password must be wrong.")
})

LoginSuite.add("after successful login, user gets notified", assert => {
  const emailInputField = document.getElementById('email')
  emailInputField.value = 'example@mail.com'

  const passwordInputField = document.getElementById('password')
  passwordInputField.value = 'P4$$word'

  const changeEvent = new Event('change')
  const focusOutEvent = new Event('focusout')

  emailInputField.dispatchEvent(changeEvent)
  passwordInputField.dispatchEvent(changeEvent)
  emailInputField.dispatchEvent(focusOutEvent)

  const loginBtn = document.querySelector('.login-submit')

  loginBtn.click()

  const loginNotification = document.querySelector('.login-validity-notification')
  assert.isNot(loginNotification.style.display, 'none')

  const message = loginNotification.querySelector('p')
  assert.is(message.innerHTML, 'Login successful!')
})


LoginSuite.run()