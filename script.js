//! Build the HTML

window.kolibri = {
  login: (container) => {
    // Build the login inside the container
    const loginTitle = document.createElement('h2')
    const loginForm = document.createElement('form')
    const loginNotification = document.createElement('div')
    const logingNotificationIcon = document.createElement('i')
    const loginNotificationMessage = document.createElement('p')
    const emailContainer = document.createElement('div')
    const emailLabel = document.createElement('label')
    const br = document.createElement('br')
    const emailInput = document.createElement('input')
    const emailNotification = document.createElement('p')
    const passwordContainer = document.createElement('div')
    const passwordLabel = document.createElement('label')
    const passwordField = document.createElement('div')
    const passwordInput = document.createElement('input')
    const showPasswordBtn = document.createElement('button')
    const forgotPasswordLink = document.createElement('a')
    const loginBtn = document.createElement('button')

    loginForm.classList.add('login-form')
    loginNotification.classList.add('login-validity-notification')
    logingNotificationIcon.classList.add('fas')
    loginNotificationMessage.classList.add('login-validity-message')
    emailContainer.classList.add('input', 'email-input')
    emailLabel.classList.add('email')
    emailInput.classList.add('input-standard', 'validation')
    emailNotification.classList.add('notification', 'email-validity-notification')
    passwordContainer.classList.add('input', 'password-input')
    passwordLabel.classList.add('password')
    passwordField.classList.add('password-field')
    passwordInput.classList.add('input-standard')
    showPasswordBtn.classList.add('btn-secondary', 'show-password-btn', 'disabled')
    forgotPasswordLink.classList.add('forgot-password')
    loginBtn.classList.add('login-submit', 'btn', 'disabled')

    emailLabel.htmlFor = 'email'
    passwordLabel.htmlFor = 'password'

    showPasswordBtn.id = 'show-pw-btn'
    showPasswordBtn.type = 'button'
    forgotPasswordLink.id = 'forgot-password'

    emailInput.placeholder = 'example@mail.com'
    emailInput.type = 'email'
    emailInput.id = 'email'
    emailInput.pattern = '.+@.+\..+'
    emailInput.required = true

    passwordInput.placeholder = 'P4$$word'
    passwordInput.id = 'password'
    passwordInput.type = 'password'
    passwordInput.name = 'password'
    passwordInput.required = true

    loginBtn.type = 'submit'
    loginBtn.disabled = true

    loginTitle.innerHTML = 'Login'
    emailLabel.innerHTML = 'E-Mail'
    passwordLabel.innerHTML = 'Password'
    showPasswordBtn.innerHTML = 'show'
    forgotPasswordLink.innerHTML = 'Forgot E-Mail or Password?'
    loginBtn.innerHTML = 'Login'

    container.appendChild(loginTitle)
    container.appendChild(loginForm)
    loginForm.appendChild(loginNotification)
    loginForm.appendChild(emailContainer)
    loginForm.appendChild(passwordContainer)
    loginForm.appendChild(loginBtn)
    loginNotification.appendChild(logingNotificationIcon)
    loginNotification.appendChild(loginNotificationMessage)
    emailContainer.appendChild(emailLabel)
    emailContainer.appendChild(br)
    emailContainer.appendChild(emailInput)
    emailContainer.appendChild(emailNotification)
    passwordContainer.appendChild(passwordLabel)
    passwordContainer.appendChild(br)
    passwordContainer.appendChild(passwordField)
    passwordContainer.appendChild(forgotPasswordLink)
    passwordField.appendChild(passwordInput)
    passwordField.appendChild(showPasswordBtn)

    afterRender()
  }
}


//! Login



const afterRender = () => {

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
      notificationContainer.style.backgroundColor = 'var(--dark-green-hsl)'
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
}