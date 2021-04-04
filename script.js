


// //! Email

// const emailNotification = document.querySelector('.email-validity-notification')
// const emailInput = document.querySelector('#email')
// const emailSubmit = document.querySelector('.email-submit')
// const emailForm = document.querySelector('.email-form')

// emailInput.addEventListener('focusout', () => {
//   if (!emailInput.checkValidity()) {
//     emailNotification.innerHTML = 'Malformed Email'
//     emailNotification.style.color = 'rgb(210, 16, 16)'
//   } else if (emailInput.value === 'example@mail.com') {
//     emailNotification.innerHTML = 'email already registered'
//     emailNotification.style.color = 'red'
//   } else {
//     emailNotification.innerHTML = ''
//   }
// })

// emailInput.addEventListener('focusin', () => {
//   emailNotification.innerHTML = ''
// })

// emailForm.addEventListener('submit', (e) => {
//   e.preventDefault()
// })



// //! Password

// const showPasswordButtons = document.querySelectorAll(".show-password-btn")
// const password = document.querySelector("#password")
// const confirmPassword = document.querySelector("#confirm-password")
// const matchNotification = document.querySelector('#match-notification')
// const uppercase = document.querySelector('.uppercase')
// const lowercase = document.querySelector('.lowercase')
// const number = document.querySelector('.number')
// const symbols = document.querySelector('.special-character')
// const chars = document.querySelector('.characters')
// const strengthLines = document.querySelector('.strength-lines')
// const strengthNotification = document.querySelector('.strength-notification')
// const lines = document.querySelectorAll('.line')
// const criterias = document.querySelectorAll('ul#pw-criterias > li')

// // At least one LOWERCASE character:
// const lowerCasePattern = /^(?=.*[a-z]).+$/;

// // At least one UPPERCASE character:
// const upperCasePattern = /^(?=.*[A-Z]).+$/;

// // At least one NUMBER:
// const numberPattern = /^(?=.*[\d]).+$/;

// // At least one SPECIAL character:
// const specialCharacterPattern = /([-+=_!@#$%^&*.,;:'\"<>/?`~\¦\°\§\´\¨\[\]\(\)\{\}\\\|\s])/;

// // At least 6 characters in the screen:
// const characterCountPattern = /^.{6,}/;


// showPasswordButtons.forEach((button) => button.addEventListener('click', function (e) {
//   if (password.type === 'password' && confirmPassword.type === 'password') {
//     password.type = 'text'
//     confirmPassword.type = 'text'
//     showPasswordButtons.forEach((button) => button.innerHTML = "Hide")
//   } else {
//     password.type = 'password'
//     confirmPassword.type = 'password'
//     showPasswordButtons.forEach((button) => button.innerHTML = "Show")
//   }

//   password.focus();
// }))

// confirmPassword.addEventListener('keyup', () => {
//   checkPasswordConfirmation()
// })

// confirmPassword.addEventListener('paste', (e) => {
//   e.preventDefault()
// })

// password.addEventListener('keyup', () => {
//   toggleRequirement(password, lowerCasePattern, lowercase)
//   toggleRequirement(password, upperCasePattern, uppercase)
//   toggleRequirement(password, numberPattern, number)
//   toggleRequirement(password, specialCharacterPattern, symbols)
//   toggleRequirement(password, characterCountPattern, chars)

//   testPasswordStrength(password.value)

//   checkPasswordConfirmation()
// })

// const toggleRequirement = (pwd, regex, el) => {
//   if (regex.test(pwd.value)) {
//     el.style.color = 'green'
//   } else {
//     el.style.color = 'red'
//   }
// }

// const testPasswordStrength = (value) => {
//   let fulfilledCriterias = 0

//   criterias.forEach(criteria => {
//     if(criteria.style.color === 'green'){
//       ++fulfilledCriterias
//     }
//   })

//   if( fulfilledCriterias === 5 && value.length >= 8) {
//     fulfilledCriterias = 6
//   }

//   styleStrengthLine(fulfilledCriterias, value)
// }

// const styleStrengthLine = (counter, value) => {
//   lines.forEach((line) => {
//     line.classList.remove("bg-red", "bg-orange", "bg-green")
//     line.classList.add("bg-transparent")
//   })

//   if (value) {
//     if (counter === 1) {
//       lines[0].classList.remove("bg-transparent")
//       lines[0].classList.add("bg-red")
//     } else if (counter > 1 && counter < 6) {
//       const linesArr = [...lines]
//       linesArr.slice(0, counter).forEach(line => line.classList.remove("bg-transparent"))
//       linesArr.slice(0, counter).forEach(line => line.classList.add("bg-orange"))
//     } else if (counter === 6) {
//       lines.forEach(line => line.classList.remove("bg-transparent"))
//       lines.forEach(line => line.classList.add("bg-green"))
//     }
//     if(counter < 5){
//       strengthNotification.innerHTML = `Missing ${5 - counter} more criterias`
//     } else {
//       strengthNotification.innerHTML = `Add a personal touch for stronger password`
//     }
//   } else {
//     strengthNotification.innerHTML = ''
//   }  
// }


// const checkPasswordConfirmation = () => {
//   if(confirmPassword.value){
//     if(confirmPassword.value === password.value) {
//       matchNotification.innerHTML = 'Passwords match!'
//       matchNotification.style.color = 'green'
//     } else if (password.value.includes(confirmPassword.value)) {
//       matchNotification.innerHTML = 'Your on a good way'
//       matchNotification.style.color = 'black'
//     } else {
//       matchNotification.innerHTML = 'oops! There seems to be a typo'
//       matchNotification.style.color = 'red'
//     }
//   } else {
//     matchNotification.innerHTML = ''
//   }
// }



//! Login

const email = 'example@mail.com'
const pw = 'P4$$word'

const loginForm = document.querySelector('.register-form')
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

console.log(criterias)

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


loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!(password.value === pw && emailInput.value === email)) {
    loginNotification.innerHTML = 'Wrong credentials'
    loginNotification.style.color = 'rgb(210, 16, 16)'
  }
})

emailInput.addEventListener('focusout', () => {
  if (!emailInput.checkValidity()) {
    emailNotification.innerHTML = 'Malformed Email'
    emailNotification.style.color = 'rgb(210, 16, 16)'
  } else if (emailInput.value === 'example@mail.com') {
    emailNotification.innerHTML = 'email already registered'
    emailNotification.style.color = 'rgb(210, 16, 16)'
  } else {
    emailNotification.innerHTML = ''
  }
})

emailInput.addEventListener('focusin', () => {
  emailNotification.innerHTML = ''
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
  if (pwd.value) {
    if (regex.test(pwd.value)) {
      el.style.color = 'green'
      el.children[0].classList.remove('fa-times-circle')
      el.children[0].classList.add('fa-check-circle')
    } else {
      el.style.color = 'red'
    }
  } else {
    el.style.color = 'black'
  }
}

const testPasswordStrength = (value) => {
  let fulfilledCriterias = 0
  criterias.forEach(criteria => {
    if (criteria.style.color === 'green') {
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
    line.classList.remove("bg-red", "bg-orange", "bg-green")
    line.classList.add("bg-default")
  })

  if (value) {
    if (counter === 1) {
      lines[0].classList.remove("bg-default")
      lines[0].classList.add("bg-red")
    } else if (counter > 1 && counter < 6) {
      const linesArr = [...lines]
      linesArr.slice(0, counter).forEach(line => line.classList.remove("bg-default"))
      linesArr.slice(0, counter).forEach(line => line.classList.add("bg-orange"))
    } else if (counter === 6) {
      lines.forEach(line => line.classList.remove("bg-default"))
      lines.forEach(line => line.classList.add("bg-green"))
    }
    if (counter < 5) {
      strengthNotification.innerHTML = `Missing ${5 - counter} more criterias`
    } else if (counter === 6) {
      strengthNotification.innerHTML = `You're password is now strong enough!`
    } else {
      strengthNotification.innerHTML = `Add a personal touch for stronger password`
    }
  } else {
    strengthNotification.innerHTML = 'Hint: Type the strongest password you can'
  }
}

const checkPasswordConfirmation = () => {
  if (confirmPasswordInput.value) {
    if (confirmPasswordInput.value === passwordInput.value) {
      matchNotification.innerHTML = 'Passwords match!'
      matchNotification.style.color = 'green'
    } else if (passwordInput.value.includes(confirmPasswordInput.value)) {
      matchNotification.innerHTML = 'You"re on a good way'
      matchNotification.style.color = 'black'
    } else {
      matchNotification.innerHTML = 'oops! There seems to be a typo'
      matchNotification.style.color = 'red'
    }
  } else {
    matchNotification.innerHTML = ''
  }
}