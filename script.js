

//! Email

const emailNotification = document.querySelector('.email-validity-notification')
const emailInput = document.querySelector('#email')
const emailSubmit = document.querySelector('.email-submit')
const emailForm = document.querySelector('.email-form')

emailInput.addEventListener('focusout', () => {
  if (!emailInput.checkValidity()) {
    emailNotification.innerHTML = 'Malformed Email'
    emailNotification.style.color = 'red'
  } else if (emailInput.value === 'example@mail.com') {
    emailNotification.innerHTML = 'email already registered'
    emailNotification.style.color = 'red'
  } else {
    emailNotification.innerHTML = ''
  }
})

emailForm.addEventListener('submit', (e) => {
  e.preventDefault()
})



//! Password

const showPasswordButtons = document.querySelectorAll(".show-password-btn")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirm-password")
const matchNotification = document.querySelector('#match-notification')
const uppercase = document.querySelector('.uppercase')
const lowercase = document.querySelector('.lowercase')
const number = document.querySelector('.number')
const specialChar = document.querySelector('.special-character')
const chars = document.querySelector('.characters')
const strengthLines = document.querySelector('.strength-lines')
const lines = document.querySelectorAll('.line')

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


showPasswordButtons.forEach((button) => button.addEventListener('click', function (e) {
  if (password.type === 'password' && confirmPassword.type === 'password') {
    password.type = 'text'
    confirmPassword.type = 'text'
    showPasswordButtons.forEach((button) => button.innerHTML = "Hide")
  } else {
    password.type = 'password'
    confirmPassword.type = 'password'
    showPasswordButtons.forEach((button) => button.innerHTML = "Show")
  }

  password.focus();
}))

confirmPassword.addEventListener('keyup', () => {
  if (password.value === confirmPassword.value) {
    matchNotification.innerHTML = 'Your passwords match!'
    matchNotification.style.color = 'green'
  } else {
    matchNotification.innerHTML = 'Your passwords do not match.'
    matchNotification.style.color = 'red'
  }
})

password.addEventListener('keyup', () => {
  toggleRequirement(password, lowerCasePattern, lowercase)
  toggleRequirement(password, upperCasePattern, uppercase)
  toggleRequirement(password, numberPattern, number)
  toggleRequirement(password, specialCharacterPattern, specialChar)
  toggleRequirement(password, characterCountPattern, chars)

  const color = testPasswordStrength(password.value)
  console.log(color)
  styleStrengthLine(color, password.value)
})

const toggleRequirement = (pwd, regex, el) => {
  if (regex.test(pwd.value)) {
    el.style.color = 'green'
  } else {
    el.style.color = 'red'
  }
}

const testPasswordStrength = (value) => {
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=/\()%ยง!@#$%^&*])(?=.{8,})'
  ),
    mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );

  if (strongRegex.test(value)) {
    return "green";
  } else if (mediumRegex.test(value)) {
    return "orange";
  } else {
    return "red";
  }
}

const styleStrengthLine = (color, value) => {
  lines.forEach((line) => {
    line.classList.remove("bg-red", "bg-orange", "bg-green")
    line.classList.add("bg-transparent")
  })

  if (value) {
    if (color === "red") {
      lines[0].classList.remove("bg-transparent")
      lines[0].classList.add("bg-red")
    } else if (color === "orange") {
      const linesArr = [...lines]
      linesArr.slice(0, 4).forEach(line => line.classList.remove("bg-transparent"))
      linesArr.slice(0, 4).forEach(line => line.classList.add("bg-orange"))
    } else if (color === "green") {
      lines.forEach(line => line.classList.remove("bg-transparent"))
      lines.forEach(line => line.classList.add("bg-green"))
    }
  }
}
