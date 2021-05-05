
// Example e-mail to simulate an already registered user
const email = 'example@mail.com'

//? Variables
// All elements
const loginForm             = document.querySelector('.register-form')
const registerBtn           = document.querySelector('.register-submit')
const loginNotification     = document.querySelector('.login-validity-notification')
const emailNotification     = document.querySelector('.email-validity-notification')
const emailInput            = document.querySelector('#email')
const passwordInput         = document.querySelector('#password')
const confirmPasswordInput  = document.querySelector('#confirm-password')
const showPasswordButtons   = document.querySelectorAll('.show-password-btn')
const lines                 = document.querySelectorAll('.line')
const criterias             = document.querySelectorAll('.criteria')
const strengthLines         = document.querySelector('.strength-lines')
const strengthNotification  = document.querySelector('.strength-notification')
const matchNotification     = document.querySelector('#match-notification')

const uppercase             = document.querySelector('.uppercase')
const lowercase             = document.querySelector('.lowercase')
const number                = document.querySelector('.number')
const symbols               = document.querySelector('.symbols')
const chars                 = document.querySelector('.characters')

// Lists
const colors                = ['bg-red', 'bg-green', 'bg-default']
const lineBgColors          = ['line-bg-red', 'line-bg-green', 'line-bg-default', 'line-bg-orange']
const icons                 = ['fa-times-circle', 'fa-check-circle']

// At least one LOWERCASE character:
const lowerCasePattern = /^(?=.*[a-z]).+$/;

// At least one UPPERCASE character:
const upperCasePattern = /^(?=.*[A-Z]).+$/;

// At least one NUMBER:
const numberPattern = /^(?=.*[\d]).+$/;

// At least one SPECIAL character:
const specialCharacterPattern = /([-+=_!@#$%^&*.,;:'\"<>/?`~\¦\°\§\´\¨\[\]\(\)\{\}\\\|\s])/;

// At least 6 characters in the screen:
const characterCountPattern = /^.{6,}/;


//? Functions

// Set or unset disable state to an element
const setDisable = (el, setDisable) => {
  el.disabled = setDisable
  if(setDisable){
    el.classList.add('disabled')
  } else {
    el.classList.remove('disabled')
  }
}

// Toggles the show button text and disability
const toggleShowButtons = () => {
  const isHidden = passwordInput.type === 'password'
  passwordInput.type = isHidden ? 'text' : 'password'
  confirmPasswordInput.type = isHidden ? 'text' : 'password'

  showPasswordButtons.forEach(button => {
    button.innerHTML = isHidden ? 'hide' : 'show'
  })
}

// Checks if the user's input in the confirm password field is on a good way, matching, or has a typo
const checkPasswordConfirmation = () => {
  if(!confirmPasswordInput.value) return matchNotification.innerHTML = ''

  if (confirmPasswordInput.value === passwordInput.value) {
    setMatchNotification('Passwords match!', 'bg-green')
  } else if (passwordInput.value.startsWith(confirmPasswordInput.value)) {
    setMatchNotification("You're on a good way", 'bg-default')
  } else {
    setMatchNotification('oops! There seems to be a typo', 'bg-red')
  }
}

// Sets Notification message and color for the confirmpasword field
const setMatchNotification = (message, backgroundColor) => {
  const bgsToRemove = colors.filter(bg => bg !== backgroundColor)

  matchNotification.innerHTML = message
  matchNotification.classList.remove(...bgsToRemove)
  matchNotification.classList.add(backgroundColor)
}

// Resets color backgrounds of an element and all its children
const resetColorsOnAll = (el) => {
  el.classList.remove(...colors)

  if(el.children[0]){
    resetColorsOnAll(el.children[0])
  }
}

// Sets color backgrounds of an element and all its childre
const setColorsOnAll = (el, color) => {
  el.classList.add(color)

  if(el.children[0]){
    setColorsOnAll(el.children[0], color)
  }
}

// remove all icon classes from an element and set the desired one
const setIconClass = (el, iconClass) => {
  el.classList.remove(...icons.filter(icon => icon !== iconClass))
  el.classList.add(iconClass)
}

// Changes color of a requirement depending on its fulfillment
const toggleRequirement = (pwd, regex, el) => {
  resetColorsOnAll(el)

  if (pwd.value) {
    if (regex.test(pwd.value)) {
      setColorsOnAll(el, 'bg-green')
      setIconClass(el.children[0], 'fa-check-circle')
    } else {
      setColorsOnAll(el, 'bg-red')
      setIconClass(el.children[0], 'fa-times-circle')
    }
  } else {
    setColorsOnAll(el, 'bg-default')
    setIconClass(el.children[0], 'fa-times-circle')
  }
}

// Checks how strong a password ist according to the amount of fulfilled criterias
const testPasswordStrength = (value) => {
  let fulfilledCriterias = 0

  // Counts how many criterias are fulfilled
  criterias.forEach(criteria => {
    if (criteria.classList.contains('bg-green')) {
      ++fulfilledCriterias
    }
  })

  // If call criterias are fulfilled, check if the extra crierai has been met as well
  if (fulfilledCriterias === 5 && value.length >= 8) {
    fulfilledCriterias = 6
  }

  // Style the strength lines according to the password strength
  initialiseStrengthLines(fulfilledCriterias, value)
}


// Resets color backgrounds of an element and all its children
const resetBackgroundsOnAll = (el) => {
  el.classList.remove(...lineBgColors)

  if(el.children[0]){
    resetColorsOnAll(el.children[0])
  }
}

// Sets color backgrounds of an element and all its childre
const setBackgroundsOnAll = (el, bg) => {
  el.classList.add(bg)

  if(el.children[0]){
    setColorsOnAll(el.children[0], bg)
  }
}

// Style strength lines according to the password strength
const styleStrengthLines = (counter) => {
  let color

  if(counter === 1)               color = 'line-bg-red'
  if(counter > 1 && counter < 6)  color = 'line-bg-orange'
  if(counter === 6)               color = 'line-bg-green';

  [...lines].slice(0, counter).forEach(line => line.classList.remove('line-bg-default'));
  [...lines].slice(0, counter).forEach(line => line.classList.add(color))
}

// Sets Notification according to the password strength
const setStrengthNotification = (counter) => {
  let message = `Missing ${5 - counter} more criterias`
  if(counter === 6) message = "You're password is now strong enough!"
  if(counter === 5) message = 'Add a personal touch for stronger password'
  if(counter === 0) message = 'Hint: Type the strongest password you can'

  strengthNotification.innerHTML = message
}

// Sets validity of the password input
const setPasswordValidity = (isValid) => {
  if(isValid){
    passwordInput.classList.add('valid')
  } else {
    passwordInput.classList.remove('valid')
  }
}



//? Event listeners

// Handle validity of email input field
emailInput.addEventListener('focusout', () => {
  // Check if email is valid or already registered and set notification accordingly
  const isValid = emailInput.checkValidity()
  const isAlreadyRegistered = emailInput.value === email

  emailNotification.innerHTML = !isValid 
    ? 'Malformed Email'          : isAlreadyRegistered 
    ? 'Email already registered' : ''

  if(!isValid || isAlreadyRegistered) {
    emailInput.classList.add('invalid')
  } else {
    emailInput.classList.remove('invalid')
  }
})

// Remove notification when user is focused on email input field
emailInput.addEventListener('focusin', () => {    
  emailNotification.innerHTML = ''
})

// Handle register button enabling/disabling
emailInput.addEventListener('keyup', () => {
  // If all inputs meet the criterias, enable the button, else disable
  if(emailInput.checkValidity() && passwordInput.classList.contains('valid') && emailInput.value !== email) {
    setDisable(registerBtn, false)
  } else {
    setDisable(registerBtn, true)
  }
})

// Toggle both show buttons and set focus to the input field next to the button
showPasswordButtons.forEach((button) => button.addEventListener('click', (e) => {
  toggleShowButtons()

  // Check whether it is the show button for the password input field, or confirm password field and set focus accordingly
  if (e.target.id === 'show-pw-btn') {
    passwordInput.focus()
  } else {
    confirmPasswordInput.focus()
  }
}))

// Handle input on the password confirm field
confirmPasswordInput.addEventListener('keyup', () => {
  checkPasswordConfirmation()
})

// Disallow user to copy paste in the confirmpassword field
confirmPasswordInput.addEventListener('paste', (e) => {
  e.preventDefault()
})

// Handles requirements list and password strength bars
passwordInput.addEventListener('keyup', () => {
  toggleRequirement(passwordInput, lowerCasePattern, lowercase)
  toggleRequirement(passwordInput, upperCasePattern, uppercase)
  toggleRequirement(passwordInput, numberPattern, number)
  toggleRequirement(passwordInput, specialCharacterPattern, symbols)
  toggleRequirement(passwordInput, characterCountPattern, chars)
  testPasswordStrength(passwordInput.value)
  checkPasswordConfirmation()
})

// Initialise the strength lines
const initialiseStrengthLines = (counter, value) => {
  lines.forEach((line) => {
    resetBackgroundsOnAll(line)
    setBackgroundsOnAll(line, 'line-bg-default')
  })

  if (!value) setDisable(registerBtn, true)

  styleStrengthLines(counter)

  setStrengthNotification(counter)

  setPasswordValidity(counter >= 6 ? true : false)

  if(emailInput.checkValidity() && counter >= 6){
    setDisable(registerBtn, false)
  } else {
    setDisable(registerBtn, true)
  }
  
}