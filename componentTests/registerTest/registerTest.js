import { Suite } from '../../test/test.js'
import kolibri from '../../script.js'
import { fireEvent } from '../../test/testUtils/events.js'

// Setting up Suite
const RegisterSuite = Suite('RegisterSuite')

// Setting up Register context
const registerContext = document.querySelector('.register')
kolibri.register(registerContext)

// declaring html elements
const registerTitle               = registerContext.querySelector('h2')
const emailInputField             = registerContext.querySelector('#email')
const emailValidityNotification   = registerContext.querySelector('.email-validity-notification')
const passwordInputField          = registerContext.querySelector('#password')
const upperCaseCriteria           = registerContext.querySelector('.uppercase')
const lowerCaseCriteria           = registerContext.querySelector('.lowercase')
const numberCriteria              = registerContext.querySelector('.number')
const symbolsCriteria             = registerContext.querySelector('.symbols')
const sixCharactersCriteria       = registerContext.querySelector('.characters')
const strengthLines               = registerContext.querySelector('.strength-lines').children
const strengthLineNotification    = registerContext.querySelector('.strength-notification')
const registerBtn                 = registerContext.querySelector('.register-submit')
const confirmPasswordInputField   = registerContext.querySelector('#confirm-password')
const matchNotification           = registerContext.querySelector('#match-notification')
const showPwBtn                   = registerContext.querySelector('#show-pw-btn')
const showConfirmPwBtn            = registerContext.querySelector('#show-confirm-pw-btn')


// Tests
RegisterSuite.add("Register dialog has title equal Register", assert => {
  assert.is(registerTitle.innerHTML, "Register")
})


RegisterSuite.add("email input field does not validate incorrect mail", assert => {
  emailInputField.value = 'examplemail.com'

  fireEvent(emailInputField, 'change')
  fireEvent(emailInputField, 'focusout')  

  assert.is(emailValidityNotification.innerHTML, "Malformed Email")
  assert.true(!emailInputField.checkValidity())
})


RegisterSuite.add("email input field notifies user when email already registered", assert => {
  emailInputField.value = 'example@mail.com'

  fireEvent(emailInputField, 'change')
  fireEvent(emailInputField, 'focusout') 

  assert.is(emailValidityNotification.innerHTML, "Email already registered")
})


RegisterSuite.add("email input field validates correct mail", assert => {
  emailInputField.value = 'some@mail.com'

  fireEvent(emailInputField, 'change')
  fireEvent(emailInputField, 'focusout')

  assert.true(emailInputField.checkValidity())
})


RegisterSuite.add("password validator detects uppercase", assert => {
  passwordInputField.value = 'A'

  fireEvent(passwordInputField, 'keyup')

  assert.true(upperCaseCriteria.classList.contains('bg-green'))
})


RegisterSuite.add("password validator detects lowercase", assert => {
  passwordInputField.value = 'a'

  fireEvent(passwordInputField, 'keyup')

  assert.true(lowerCaseCriteria.classList.contains('bg-green'))
})


RegisterSuite.add("password validator detects number", assert => {
  passwordInputField.value = '1'

  fireEvent(passwordInputField, 'keyup')

  assert.true(numberCriteria.classList.contains('bg-green'))
})


RegisterSuite.add("password validator detects symbol", assert => {
  passwordInputField.value = '§'

  fireEvent(passwordInputField, 'keyup')

  assert.true(symbolsCriteria.classList.contains('bg-green'))
})


RegisterSuite.add("password validator detects 6 characters", assert => {
  passwordInputField.value = '123456'

  fireEvent(passwordInputField, 'keyup')

  assert.true(sixCharactersCriteria.classList.contains('bg-green'))
})


RegisterSuite.add("1 red strength line is show when only 1 criteria passes and feedback text changes", assert => {
  passwordInputField.value = 'A'

  fireEvent(passwordInputField, 'keyup')

  const [redline, ...otherLines] = strengthLines

  assert.true(redline.classList.contains('line-bg-red'))
  otherLines.forEach(line => assert.true(line.classList.contains('line-bg-default')))

  assert.is(strengthLineNotification.innerHTML, 'Missing 4 more criterias')
})


RegisterSuite.add("Two orange strength lines are shown when two criterias pass and feedback text changes", assert => {
  passwordInputField.value = 'Aa'

  fireEvent(passwordInputField, 'keyup')

  const [orangeLine1, orangeLine2, ...otherLines] = strengthLines

  assert.true(orangeLine1.classList.contains('line-bg-orange'))
  assert.true(orangeLine2.classList.contains('line-bg-orange'))
  otherLines.forEach(line => assert.true(line.classList.contains('line-bg-default')))

  assert.is(strengthLineNotification.innerHTML, 'Missing 3 more criterias')
})


RegisterSuite.add("Three orange strength lines are shown when three criterias pass and feedback text changes", assert => {
  passwordInputField.value = 'Aa1'

  fireEvent(passwordInputField, 'keyup')

  const [orangeLine1, orangeLine2, orangeLine3, ...otherLines] = strengthLines

  assert.true(orangeLine1.classList.contains('line-bg-orange'))
  assert.true(orangeLine2.classList.contains('line-bg-orange'))
  assert.true(orangeLine3.classList.contains('line-bg-orange'))
  otherLines.forEach(line => assert.true(line.classList.contains('line-bg-default')))

  assert.is(strengthLineNotification.innerHTML, 'Missing 2 more criterias')
})


RegisterSuite.add("Four orange strength lines are shown when four criterias pass and feedback text changes", assert => {
  passwordInputField.value = 'Aa1§'

  fireEvent(passwordInputField, 'keyup')

  const [ defaultLine1, defaultLine2, ...orangeLines ] = [ ...strengthLines ].reverse()

  orangeLines.forEach(line => assert.true(line.classList.contains('line-bg-orange')))
  assert.true(defaultLine1.classList.contains('line-bg-default'))
  assert.true(defaultLine2.classList.contains('line-bg-default'))

  assert.is(strengthLineNotification.innerHTML, 'Missing 1 more criterias')
})


RegisterSuite.add("Five orange strength lines are shown when all criterias pass and feedback text changes", assert => {
  passwordInputField.value = 'Aa1§56'
  
  fireEvent(passwordInputField, 'keyup')

  const [ defaultLine, ...orangeLines ] = [ ...strengthLines ].reverse()

  orangeLines.forEach(line => assert.true(line.classList.contains('line-bg-orange')))
  assert.true(defaultLine.classList.contains('line-bg-default'))

  assert.is(strengthLineNotification.innerHTML, 'Add a personal touch for stronger password')
})


RegisterSuite.add("Six green strength lines are shown when all criterias pass and password length is higher or equals 8 and feedback text changes", assert => {
  passwordInputField.value = 'Aa1§5678'
  
  fireEvent(passwordInputField, 'keyup')

  const strengthLinesArr = [ ...strengthLines ]

  strengthLinesArr.forEach(line => assert.true(line.classList.contains('line-bg-green')))

  assert.is(strengthLineNotification.innerHTML, "You're password is now strong enough!")
})


RegisterSuite.add("Register button is enabled when email and password inputs are valid/strong enough", assert => {
  // If both input fields are invalid, button is disabled
  passwordInputField.value = 'weakPassword'
  emailInputField.value = 'invalidMail'

  fireEvent(passwordInputField, 'keyup')
  fireEvent(emailInputField, 'focusout')

  assert.true(registerBtn.classList.contains('disabled'))
  
  // If only password is strong enough, it should still be disabled
  passwordInputField.value = 'P4$$word'

  fireEvent(passwordInputField, 'keyup')

  assert.true(registerBtn.classList.contains('disabled'))

  // If only email is valid, it should still be disabled
  passwordInputField.value = 'weakPassword'
  emailInputField.value = 'some@mail.com'

  fireEvent(passwordInputField, 'keyup')
  fireEvent(emailInputField, 'focusout')

  assert.true(registerBtn.classList.contains('disabled'))

  // If BOTH input fields are valid, it should be enabled
  passwordInputField.value = 'P4$$word'

  fireEvent(passwordInputField, 'keyup')

  assert.true(!registerBtn.classList.contains('disabled'))
})


RegisterSuite.add("Confirm Password field notifies when user misstypes during typing", assert => {
  confirmPasswordInputField.value = 'B'

  fireEvent(confirmPasswordInputField, 'keyup')

  assert.is(matchNotification.innerHTML, 'oops! There seems to be a typo')
})


RegisterSuite.add("Confirm Password field notifies when user is typing correctly so far", assert => {
  confirmPasswordInputField.value = 'P4$$'

  fireEvent(confirmPasswordInputField, 'keyup')

  assert.is(matchNotification.innerHTML, "You're on a good way")
})


RegisterSuite.add("Confirm Password field notifies when user successfully matched the password", assert => {
  confirmPasswordInputField.value = 'P4$$word'

  fireEvent(confirmPasswordInputField, 'keyup')

  assert.is(matchNotification.innerHTML, 'Passwords match!')
})


RegisterSuite.add("Password show-button and Confirm Password show-button show both password input fields and sets focus to the nearby input field", assert => {
  // Confirm that both input fields are NOT showing the passwords yet
  assert.true(passwordInputField.type, 'password')
  assert.true(confirmPasswordInputField.type, 'password')

  // When clicking the showPWBtn, it toggles both passwordfields to text, changes both btn labels to hide and focuses password input field
  showPwBtn.click()

  assert.true(passwordInputField.type, 'text')
  assert.true(confirmPasswordInputField.type, 'text')

  assert.is(showConfirmPwBtn.innerHTML, 'hide')
  assert.is(showPwBtn.innerHTML, 'hide')

  assert.is(document.activeElement, passwordInputField)

  // When click the showConfirmPwBtn, it toggles both passwordfields to password, changes both btn labels to show and focuses the confirm password input field
  showConfirmPwBtn.click()

  assert.true(passwordInputField.type, 'password')
  assert.true(confirmPasswordInputField.type, 'password')

  assert.is(showConfirmPwBtn.innerHTML, 'show')
  assert.is(showPwBtn.innerHTML, 'show')

  assert.is(document.activeElement, confirmPasswordInputField)
})



RegisterSuite.run()