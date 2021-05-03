
//! Login

const email = 'example@mail.com'
const pw = 'P4$$word'

const loginForm = document.querySelector('.login-form')
const loginBtn = document.querySelector('.login-submit')
const notificationContainer = document.querySelector('.login-validity-notification')
const notificationMessage = document.querySelector('.login-validity-notification p')
const notificationIcon = document.querySelector('.login-validity-notification i')
const emailNotification = document.querySelector('.email-validity-notification')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const showPwBtn = document.querySelector('#show-pw-btn')


loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!(passwordInput.value === pw && emailInput.value === email)) {
    notificationMessage.innerHTML = `Sorry, we couldn't match your request. Your E-Mail or Password must be wrong.`
    notificationContainer.style.display = 'flex'
    notificationContainer.style.backgroundColor = 'var(--red-hsl)'
    notificationContainer.style.color = 'var(--white-hsl)'
    notificationIcon.classList.add('fa-exclamation-circle')
  } else {
    notificationMessage.innerHTML = `Login successful!`
    notificationContainer.style.display = 'flex'
    notificationContainer.style.backgroundColor = 'var(--dark-green-hsl)
    notificationContainer.style.color = 'var(--white-hsl)'
    notificationIcon.classList.add('fa-check-circle')
  }

  if (showPwBtn.classList.contains('disabled')) {
    showPwBtn.classList.remove('disabled')
  }

  emailInput.value = ''
  passwordInput.value = ''
  loginBtn.disabled = true
  loginBtn.classList.add('disabled')
})

emailInput.addEventListener('focusout', () => {
  if (!emailInput.value) return
  if (!emailInput.checkValidity()) {
    emailNotification.innerHTML = 'Malformed Email'
    emailNotification.style.color = 'var(--red-hsl)'
  } else {
    emailNotification.innerHTML = ''
  }
})

emailInput.addEventListener('focusin', () => {
  emailNotification.innerHTML = ''
})

emailInput.addEventListener('change', () => {
  if (emailInput.checkValidity() && passwordInput.value !== '') {
    loginBtn.classList.remove('disabled')
    loginBtn.disabled = false
  } else {
    loginBtn.classList.add('disabled')
    loginBtn.disabled = true
  }
})

passwordInput.addEventListener('keyup', () => {
  if (emailInput.checkValidity() && passwordInput.value !== '') {
    loginBtn.classList.remove('disabled')
    loginBtn.disabled = false
  } else {
    loginBtn.classList.add('disabled')
    loginBtn.disabled = true
  }
})

showPwBtn.addEventListener('click', () => {
  if (showPwBtn.classList.contains('disabled')) {
    return
  }
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'
    showPwBtn.innerHTML = "Hide"
  } else {
    passwordInput.type = 'password'
    showPwBtn.innerHTML = "Show"
  }
})
