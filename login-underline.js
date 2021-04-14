
//! Login

const email2 = "example@mail.com";
const pw2 = 'P4$$word'

const loginForm2 = document.querySelector('.login-form-underline')
const loginBtn2 = document.querySelector('.login-submit-underline')
const notificationContainer2 = document.querySelector('.login-validity-notification-underline')
const notificationMessage2 = document.querySelector('.login-validity-notification-underline p')
const notificationIcon2 = document.querySelector('.login-validity-notification-underline i')
const emailNotification2 = document.querySelector('.email-validity-notification-underline')
const emailInput2 = document.querySelector('#email-underline')
const passwordInput2 = document.querySelector('#password-underline')
const showPwBtn2 = document.querySelector('#show-pw-btn-underline')


loginForm2.addEventListener('submit', (e) => {
  e.preventDefault()
  if(!(passwordInput2.value === pw2 && emailInput2.value === email2)){
    notificationMessage2.innerHTML = `Sorry, we couldn't match your request. Your E-Mail or Password must be wrong.`
    notificationContainer2.style.display = 'flex'
    notificationContainer2.style.backgroundColor = 'var(--red-hsl)'
    notificationContainer2.style.color = 'var(--white-hsl)'
    notificationIcon2.classList.add('fa-exclamation-circle')
  } else {
    notificationMessage2.innerHTML = `Login successful!`
    notificationContainer2.style.display = 'flex'
    notificationContainer2.style.backgroundColor = 'var(--dark-green-hsl)'
    notificationContainer2.style.color = 'var(--white-hsl)'
    notificationIcon2.classList.add('fa-check-circle')
  }

  if(showPwBtn2.classList.contains('disabled')){
    showPwBtn2.classList.remove('disabled')
  }
})

emailInput2.addEventListener('focusout', () => {
  if(!emailInput2.value) return
  if (!emailInput2.checkValidity()) {
    emailNotification2.innerHTML = 'Malformed Email'
    emailNotification2.style.color = 'rgb(210, 16, 16)'
  } else {
    emailNotification2.innerHTML = ''
  }
})

emailInput2.addEventListener('focusin', () => {
  emailNotification2.innerHTML = ''
})

emailInput2.addEventListener('change', () => {
  if(emailInput2.checkValidity()){
    loginBtn2.classList.remove('disabled')
    loginBtn2.disabled = false
  } else {
    loginBtn2.classList.add('disabled')
    loginBtn2.disabled = true
  }
})

showPwBtn2.addEventListener('click', () => {
  if(showPwBtn2.classList.contains('disabled')){
    return
  }
  if (passwordInput2.type === 'password') {
    passwordInput2.type = 'text'
    showPwBtn2.innerHTML = "Hide"
  } else {
    passwordInput2.type = 'password'
    showPwBtn2.innerHTML = "Show"
  }
})
