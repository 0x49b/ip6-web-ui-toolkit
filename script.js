
//! Login

const email = 'example@mail.com'
const pw = 'P4$$word'

const loginForm = document.querySelector('.login-form')
const loginNotification = document.querySelector('.login-validity-notification')
const emailNotification = document.querySelector('.email-validity-notification')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const showPwBtn = document.querySelector('#show-pw-btn')


loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if(!(passwordInput.value === pw && emailInput.value === email)){
    loginNotification.innerHTML = 'Wrong credentials'
    loginNotification.style.color = 'rgb(210, 16, 16)'
  } else {
    loginNotification.innerHTML = 'Login successful!'
    loginNotification.style.color = 'green'
  }

  if(showPwBtn.classList.contains('disabled')){
    showPwBtn.classList.remove('disabled')
  }
})

emailInput.addEventListener('focusout', () => {
  if(!emailInput.value) return
  if (!emailInput.checkValidity()) {
    emailNotification.innerHTML = 'Malformed Email'
    emailNotification.style.color = 'rgb(210, 16, 16)'
  } else {
    emailNotification.innerHTML = ''
  }
})

emailInput.addEventListener('focusin', () => {
  emailNotification.innerHTML = ''
})

showPwBtn.addEventListener('click', () => {
  if(showPwBtn.classList.contains('disabled')){
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
