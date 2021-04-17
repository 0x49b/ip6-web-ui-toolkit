const email2 = 'example@mail.com'
const pw2 = 'P4$$word'

const loginForm2 = document.querySelector('.register-form-underline')
const registerBtn2 = document.querySelector('.register-submit-underline')
const loginNotification2 = document.querySelector('.login-validity-notification-underline')
const emailNotification2 = document.querySelector('.email-validity-notification-underline')
const emailInput2 = document.querySelector('#email-underline')
const emailInputUnderline = document.getElementById('email-input-underline')
const passwordInput2 = document.querySelector('#password-underline')
const confirmPasswordInput2 = document.querySelector('#confirm-password-underline')
const showPasswordButtons2 = document.querySelectorAll('.show-password-btn-underline')
const lines2 = document.querySelectorAll('.line-underline')
const criterias2 = document.querySelectorAll('.criteria-underline')
const strengthNotification2 = document.querySelector('.strength-notification-underline')
const matchNotification2 = document.querySelector('#match-notification-underline')

const uppercase2 = document.querySelector('.uppercase-underline')
const lowercase2 = document.querySelector('.lowercase-underline')
const number2 = document.querySelector('.number-underline')
const symbols2 = document.querySelector('.symbols-underline')
const chars2 = document.querySelector('.characters-underline')


// At least one LOWERCASE character:
const lowerCasePattern2 = /^(?=.*[a-z]).+$/;

// At least one UPPERCASE character:
const upperCasePattern2 = /^(?=.*[A-Z]).+$/;

// At least one NUMBER:
const numberPattern2 = /^(?=.*[\d]).+$/;

// At least one SPECIAL character:
const specialCharacterPattern2 = /([-+=_!@#$%^&*.,;:'\"<>/?`~\¦\°\§\´\¨\[\]\(\)\{\}\\\|\s])/;

// At least 6 characters in the screen:
const characterCountPattern2 = /^.{6,}/;


const setDisable2 = (el, disable) => {
  el.disabled = disable
  if(disable){
    el.classList.add('disabled')
  } else {
    el.classList.remove('disabled')
  }
}

emailInput2.addEventListener('focusout', () => {
  if (!emailInput2.checkValidity()) {
    emailNotification2.innerHTML = 'Malformed Email'
    emailNotification2.style.color = 'var(--red)'
  } else if (emailInput2.value === email2) {
    emailNotification2.innerHTML = 'email already registered'
    emailNotification2.style.color = 'var(--red)'
    emailInputUnderline.style.background = 'var(--red)'
    emailInputUnderline.style.filter = 'drop-shadow(0px 0px 3px var(--red))'
  } else {
    emailInputUnderline.style.background = ''
    emailInputUnderline.style.filter = ''
    emailNotification2.innerHTML = ''
  }
})

emailInput2.addEventListener('focusin', () => {
  emailInput2.style.border = ''
  emailInput2.style.filter = ''
  emailNotification2.innerHTML = ''
})

emailInput2.addEventListener('keyup', () => {
  if(emailInput2.checkValidity() && passwordInput2.classList.contains('valid') && emailInput2.value !== email2) {
    setDisable2(registerBtn2, false)
  } else {
    setDisable2(registerBtn2, true)
  }
})

showPasswordButtons2.forEach((button) => button.addEventListener('click', (e) => {
  if (passwordInput2.type === 'password' && confirmPasswordInput2.type === 'password') {
    passwordInput2.type = 'text'
    confirmPasswordInput2.type = 'text'
    showPasswordButtons2.forEach((button) => button.innerHTML = "Hide")
  } else {
    passwordInput2.type = 'password'
    confirmPasswordInput2.type = 'password'
    showPasswordButtons2.forEach((button) => button.innerHTML = "Show")
  }

  if (e.target.id === 'show-pw-btn-underline') {
    passwordInput2.focus()
  } else {
    confirmPasswordInput2.focus()
  }

}))

confirmPasswordInput2.addEventListener('keyup', () => {
  checkPasswordConfirmation2()
})

confirmPasswordInput2.addEventListener('paste', (e) => {
  e.preventDefault()
})

passwordInput2.addEventListener('keyup', () => {
  toggleRequirement2(passwordInput2, lowerCasePattern2, lowercase2)
  toggleRequirement2(passwordInput2, upperCasePattern2, uppercase2)
  toggleRequirement2(passwordInput2, numberPattern2, number2)
  toggleRequirement2(passwordInput2, specialCharacterPattern2, symbols2)
  toggleRequirement2(passwordInput2, characterCountPattern2, chars2)
  testPasswordStrength2(passwordInput2.value)
  checkPasswordConfirmation2()
})

const toggleRequirement2 = (pwd, regex, el) => {
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


const testPasswordStrength2 = (value) => {
  let fulfilledCriterias = 0
  criterias2.forEach(criteria => {
    if (criteria.classList.contains('bg-green')) {
      ++fulfilledCriterias
    }
  })
  if (fulfilledCriterias === 5 && value.length >= 8) {
    fulfilledCriterias = 6
  }
  styleStrengthLine2(fulfilledCriterias, value)
}

const styleStrengthLine2 = (counter, value) => {
  lines2.forEach((line) => {
    line.classList.remove("line-bg-red", "line-bg-orange", "line-bg-green")
    line.classList.add("line-bg-default")
  })

  if (value) {

    if (counter === 1) {
      lines2[0].classList.remove("line-bg-default")
      lines2[0].classList.add("line-bg-red")
    } else if (counter > 1 && counter < 6) {
      const linesArr = [...lines2]
      linesArr.slice(0, counter).forEach(line => line.classList.remove("line-bg-default"))
      linesArr.slice(0, counter).forEach(line => line.classList.add("line-bg-orange"))
    } else if (counter === 6) {
      lines2.forEach(line => line.classList.remove("line-bg-default"))
      lines2.forEach(line => line.classList.add("line-bg-green"))
    }
    if (counter < 5) {
      strengthNotification2.innerHTML = `Missing ${5 - counter} more criterias`
      passwordInput2.classList.remove('valid')
      setDisable2(registerBtn2, true)
    } else if (counter === 6) {
      strengthNotification2.innerHTML = `You're password is now strong enough!`
      passwordInput2.classList.add('valid')
      if (emailInput2.checkValidity()){
        setDisable2(registerBtn2, false)
      } else {
        setDisable2(registerBtn2, true)
      }
    } else {
      strengthNotification2.innerHTML = `Add a personal touch for stronger password`
      passwordInput2.classList.remove('valid')
      setDisable2(registerBtn2, true)
    }
  } else {
    strengthNotification2.innerHTML = 'Hint: Type the strongest password you can'
    setDisable2(registerBtn2, true)
  }
}
const checkPasswordConfirmation2 = () => {
  if (confirmPasswordInput2.value) {
    if (confirmPasswordInput2.value === passwordInput2.value) {
      matchNotification2.classList.remove('bg-default', 'bg-red')
      matchNotification2.innerHTML = 'Passwords match!'
      matchNotification2.classList.add('bg-green')
    } else if (passwordInput2.value.startsWith(confirmPasswordInput2.value)) {
      matchNotification2.classList.remove('bg-red', 'bg-green')
      matchNotification2.innerHTML = 'You"re on a good way'
      matchNotification2.classList.add('bg-default')
    } else {
      matchNotification2.classList.remove('bg-default', 'bg-green')
      matchNotification2.innerHTML = 'oops! There seems to be a typo'
      matchNotification2.classList.add('bg-red')
    }
  } else {
    matchNotification2.innerHTML = ''
  }
}