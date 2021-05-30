import { Suite } from '../../test/test.js'
import kolibri from '../../script.js'
import { fireEvent } from '../../test/testUtils/events.js'
import { setInputValue } from '../../test/testUtils/setInputValue.js'

// Setting up Suite
const RegisterSuite = Suite('RegisterSuite')

// Setting up Register context
const registerContext = document.querySelector('.register')
kolibri.register(registerContext)

// Declaring HTML Elements
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


// Util functions for repetitive tasks specific for Tests in this Suite
// Checks whether the register button is disabled or not, deoending on email and pw input value
const checkIfRegisterBtnIsDisabled = ( emailValue, pwValue ) => {
  setInputValue(emailInputField, emailValue)
  setInputValue(passwordInputField, pwValue)

  return registerBtn.classList.contains('disabled')
}

// Checks if a password criteria validates when its crieria is met
const criteriaIsValidating = (pwValue, criteria) => {
  setInputValue(passwordInputField, pwValue)

  return criteria.classList.contains('bg-green')
}




// Tests
RegisterSuite.add("Register dialog has title equal Register", assert => {
  assert.is(registerTitle.innerHTML, "Register")
})

RegisterSuite.add("email input field does not validate incorrect mail", assert => {
  setInputValue(emailInputField, 'examplemail.com')

  assert.is(emailValidityNotification.innerHTML, "Malformed Email")
  assert.true(!emailInputField.checkValidity())
})


RegisterSuite.add("email input field notifies user when email already registered", assert => {
  setInputValue(emailInputField, 'example@mail.com')

  assert.is(emailValidityNotification.innerHTML, "Email already registered")
})


RegisterSuite.add("email input field validates correct mail", assert => {
  setInputValue(emailInputField, 'some@mail.com')

  assert.true(emailInputField.checkValidity())
})


RegisterSuite.add("password validator detects uppercase", assert => {
  const isValidating = criteriaIsValidating('A', upperCaseCriteria)

  assert.true(isValidating)
})


RegisterSuite.add("password validator detects lowercase", assert => {
  const isValidating = criteriaIsValidating('a', lowerCaseCriteria)

  assert.true(isValidating)
})


RegisterSuite.add("password validator detects number", assert => {
  const isValidating = criteriaIsValidating('1', numberCriteria)

  assert.true(isValidating)
})


RegisterSuite.add("password validator detects symbol", assert => {
  const isValidating = criteriaIsValidating('§', symbolsCriteria)

  assert.true(isValidating)
})


RegisterSuite.add("password validator detects 6 characters", assert => {
  const isValidating = criteriaIsValidating('123456', sixCharactersCriteria)

  assert.true(isValidating)
})


RegisterSuite.add("1 red strength line is show when only 1 criteria passes and feedback text changes", assert => {
  setInputValue(passwordInputField, 'A')

  const [redline, ...otherLines] = strengthLines

  assert.true(redline.classList.contains('line-bg-red'))
  otherLines.forEach(line => assert.true(line.classList.contains('line-bg-default')))

  assert.is(strengthLineNotification.innerHTML, 'Missing 4 more criterias')
})


RegisterSuite.add("Two orange strength lines are shown when two criterias pass and feedback text changes", assert => {
  setInputValue(passwordInputField, 'Aa')

  const [orangeLine1, orangeLine2, ...otherLines] = strengthLines

  assert.true(orangeLine1.classList.contains('line-bg-orange'))
  assert.true(orangeLine2.classList.contains('line-bg-orange'))
  otherLines.forEach(line => assert.true(line.classList.contains('line-bg-default')))

  assert.is(strengthLineNotification.innerHTML, 'Missing 3 more criterias')
})


RegisterSuite.add("Three orange strength lines are shown when three criterias pass and feedback text changes", assert => {
  setInputValue(passwordInputField, 'Aa1')

  const [orangeLine1, orangeLine2, orangeLine3, ...otherLines] = strengthLines

  assert.true(orangeLine1.classList.contains('line-bg-orange'))
  assert.true(orangeLine2.classList.contains('line-bg-orange'))
  assert.true(orangeLine3.classList.contains('line-bg-orange'))
  otherLines.forEach(line => assert.true(line.classList.contains('line-bg-default')))

  assert.is(strengthLineNotification.innerHTML, 'Missing 2 more criterias')
})


RegisterSuite.add("Four orange strength lines are shown when four criterias pass and feedback text changes", assert => {
  setInputValue(passwordInputField, 'Aa1§')

  const [ defaultLine1, defaultLine2, ...orangeLines ] = [ ...strengthLines ].reverse()

  orangeLines.forEach(line => assert.true(line.classList.contains('line-bg-orange')))
  assert.true(defaultLine1.classList.contains('line-bg-default'))
  assert.true(defaultLine2.classList.contains('line-bg-default'))

  assert.is(strengthLineNotification.innerHTML, 'Missing 1 more criterias')
})


RegisterSuite.add("Five orange strength lines are shown when all criterias pass and feedback text changes", assert => {
  setInputValue(passwordInputField, 'Aa1§56')

  const [ defaultLine, ...orangeLines ] = [ ...strengthLines ].reverse()

  orangeLines.forEach(line => assert.true(line.classList.contains('line-bg-orange')))
  assert.true(defaultLine.classList.contains('line-bg-default'))

  assert.is(strengthLineNotification.innerHTML, 'Add a personal touch for stronger password')
})


RegisterSuite.add("Six green strength lines are shown when all criterias pass and password length is higher or equals 8 and feedback text changes", assert => {
  setInputValue(passwordInputField, 'Aa1§5678')

  const strengthLinesArr = [ ...strengthLines ]

  strengthLinesArr.forEach(line => assert.true(line.classList.contains('line-bg-green')))

  assert.is(strengthLineNotification.innerHTML, "You're password is now strong enough!")
})


RegisterSuite.add("Register button is enabled when email and password inputs are valid/strong enough", assert => {
  // If both input fields are invalid, button is disabled
  let isDisabled = checkIfRegisterBtnIsDisabled( 'invalidMail', 'weakPassword' )

  assert.true(isDisabled)
  
  // If only password is strong enough, it should still be disabled
  isDisabled = checkIfRegisterBtnIsDisabled( 'invalidMail', 'P4$$word' )

  assert.true(isDisabled)

  // If only email is valid, it should still be disabled
  isDisabled = checkIfRegisterBtnIsDisabled( 'valid@mail.com', 'weakPw' )

  assert.true(isDisabled)

  // If BOTH input fields are valid, it should be enabled
  isDisabled = checkIfRegisterBtnIsDisabled( 'valid@mail.com', 'P4$$word' )

  assert.true(!isDisabled)
})


RegisterSuite.add("Confirm Password field notifies when user misstypes during typing", assert => {
  // Currently "P4$$word" is in the password input field
  setInputValue(confirmPasswordInputField, 'A')

  assert.is(matchNotification.innerHTML, 'oops! There seems to be a typo')
})


RegisterSuite.add("Confirm Password field notifies when user is typing correctly so far", assert => {
  setInputValue(confirmPasswordInputField, 'P4$$')

  assert.is(matchNotification.innerHTML, "You're on a good way")
})


RegisterSuite.add("Confirm Password field notifies when user successfully matched the password", assert => {
  setInputValue(confirmPasswordInputField, 'P4$$word')

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