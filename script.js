const email = 'example@mail.com'
const pw = 'P4$$word'

const loginForm = document.querySelector('.register-form')
const registerBtn = document.querySelector('.register-submit')
const loginNotification = document.querySelector('.login-validity-notification')
const emailNotification = document.querySelector('.email-validity-notification')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const confirmPasswordInput = document.querySelector('#confirm-password')
const showPasswordButtons = document.querySelectorAll('.show-password-btn')
const lines = document.querySelectorAll('.line')
const criterias = document.querySelectorAll('.criteria')
const strengthLines = document.querySelector('.strength-lines')
const strengthNotification = document.querySelector('.strength-notification')
const matchNotification = document.querySelector('#match-notification')

const uppercase = document.querySelector('.uppercase')
const lowercase = document.querySelector('.lowercase')
const number = document.querySelector('.number')
const symbols = document.querySelector('.symbols')
const chars = document.querySelector('.characters')


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


const setDisable = (el, disable) => {
  el.disabled = disable
  if(disable){
    el.classList.add('disabled')
  } else {
    el.classList.remove('disabled')
  }
}

emailInput.addEventListener('focusout', () => {
  if (!emailInput.checkValidity()) {
    emailNotification.innerHTML = 'Malformed Email'
    emailNotification.style.color = 'rgb(210, 16, 16)'
  } else if (emailInput.value === 'example@mail.com') {
    emailNotification.innerHTML = 'email already registered'
    emailNotification.style.color = 'rgb(210, 16, 16)'
    emailInput.style.border = '1px solid rgb(210, 16, 16)'
    emailInput.style.filter = 'drop-shadow(2px 2px 3px rgba(235, 87, 87, 0.53))'
  } else {
    emailNotification.innerHTML = ''
  }
})

emailInput.addEventListener('focusin', () => {
  emailInput.style.border = ''
  emailInput.style.filter = ''
  emailNotification.innerHTML = ''
})

emailInput.addEventListener('keyup', () => {
  if(emailInput.checkValidity() && passwordInput.classList.contains('valid') && emailInput.value !== email) {
    setDisable(registerBtn, false)
  } else {
    setDisable(registerBtn, true)
  }
})

showPasswordButtons.forEach((button) => button.addEventListener('click', (e) => {
  if (passwordInput.type === 'password' && confirmPasswordInput.type === 'password') {
    passwordInput.type = 'text'
    confirmPasswordInput.type = 'text'
    showPasswordButtons.forEach((button) => button.innerHTML = "Hide")
  } else {
    passwordInput.type = 'password'
    confirmPasswordInput.type = 'password'
    showPasswordButtons.forEach((button) => button.innerHTML = "Show")
  }

  if (e.target.id === 'show-pw-btn') {
    passwordInput.focus()
  } else {
    confirmPasswordInput.focus()
  }

}))

confirmPasswordInput.addEventListener('keyup', () => {
  checkPasswordConfirmation()
})

confirmPasswordInput.addEventListener('paste', (e) => {
  e.preventDefault()
})

passwordInput.addEventListener('keyup', () => {
  toggleRequirement(passwordInput, lowerCasePattern, lowercase)
  toggleRequirement(passwordInput, upperCasePattern, uppercase)
  toggleRequirement(passwordInput, numberPattern, number)
  toggleRequirement(passwordInput, specialCharacterPattern, symbols)
  toggleRequirement(passwordInput, characterCountPattern, chars)
  testPasswordStrength(passwordInput.value)
  checkPasswordConfirmation()
})

const toggleRequirement = (pwd, regex, el) => {
  el.children[0].classList.remove('bg-green')
  el.children[0].classList.remove('bg-red')
  el.children[0].classList.remove('bg-default')

  el.classList.remove('bg-green')
  el.classList.remove('bg-red')
  el.classList.remove('bg-default')

  if (pwd.value) {
    if (regex.test(pwd.value)) {
      el.classList.add('bg-green')
      el.children[0].classList.add('bg-green')
      el.children[0].classList.remove('fa-times-circle')
      el.children[0].classList.add('fa-check-circle')
    } else {
      el.classList.add('bg-red')
      el.children[0].classList.add('bg-red')
      el.children[0].classList.remove('fa-check-circle')
      el.children[0].classList.add('fa-times-circle')
    }
  } else {
    el.classList.add('bg-default')
    el.children[0].classList.add('bg-default')
    el.children[0].classList.remove('fa-check-circle')
    el.children[0].classList.add('fa-times-circle')
  }
}


const testPasswordStrength = (value) => {
  let fulfilledCriterias = 0
  criterias.forEach(criteria => {
    if (criteria.classList.contains('bg-green')) {
      ++fulfilledCriterias
    }
  })
  if (fulfilledCriterias === 5 && value.length >= 8) {
    fulfilledCriterias = 6
  }
  styleStrengthLine(fulfilledCriterias, value)
}

const styleStrengthLine = (counter, value) => {
  lines.forEach((line) => {
    line.classList.remove("line-bg-red", "line-bg-orange", "line-bg-green")
    line.classList.add("line-bg-default")
  })

  if (value) {

    if (counter === 1) {
      lines[0].classList.remove("line-bg-default")
      lines[0].classList.add("line-bg-red")
    } else if (counter > 1 && counter < 6) {
      const linesArr = [...lines]
      linesArr.slice(0, counter).forEach(line => line.classList.remove("line-bg-default"))
      linesArr.slice(0, counter).forEach(line => line.classList.add("line-bg-orange"))
    } else if (counter === 6) {
      lines.forEach(line => line.classList.remove("line-bg-default"))
      lines.forEach(line => line.classList.add("line-bg-green"))
    }
    if (counter < 5) {
      strengthNotification.innerHTML = `Missing ${5 - counter} more criterias`
      passwordInput.classList.remove('valid')
      setDisable(registerBtn, true)
    } else if (counter === 6) {
      strengthNotification.innerHTML = `You're password is now strong enough!`
      passwordInput.classList.add('valid')
      if (emailInput.checkValidity()){
        setDisable(registerBtn, false)
      } else {
        setDisable(registerBtn, true)
      }
    } else {
      strengthNotification.innerHTML = `Add a personal touch for stronger password`
      passwordInput.classList.remove('valid')
      setDisable(registerBtn, true)
    }
  } else {
    strengthNotification.innerHTML = 'Hint: Type the strongest password you can'
    setDisable(registerBtn, true)
  }
}
const checkPasswordConfirmation = () => {
  if (confirmPasswordInput.value) {
    if (confirmPasswordInput.value === passwordInput.value) {
      matchNotification.classList.remove('bg-default', 'bg-red')
      matchNotification.innerHTML = 'Passwords match!'
      matchNotification.classList.add('bg-green')
    } else if (passwordInput.value.includes(confirmPasswordInput.value)) {
      matchNotification.classList.remove('bg-red', 'bg-green')
      matchNotification.innerHTML = 'You"re on a good way'
      matchNotification.classList.add('bg-default')
    } else {
      matchNotification.classList.remove('bg-default', 'bg-green')
      matchNotification.innerHTML = 'oops! There seems to be a typo'
      matchNotification.classList.add('bg-red')
    }
  } else {
    matchNotification.innerHTML = ''
  }
}