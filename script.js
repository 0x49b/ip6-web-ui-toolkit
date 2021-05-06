//! Build the HTML

window.kolibri = {
  login: (container) => {

    const head = document.querySelector('head')
    const style = document.createElement('style')
    style.innerHTML = `
    :root {

      /* Colors in HEX */
      --gray1: #333333;
      --gray4: #BDBDBD;
      --gray6: #F2F2F2;
      --white: #fcfcfc;
      --dark-blue: #184BCE;
      --dark-blue-hover: #3768E8;
      --dark-green: #298808;
      --light-green: #91F58C;
      --red: #EB5757;
    
      /* Colors in hsl */
      --gray1-hsl:           hsl(0,   0%,   20%);
      --gray4-hsl:           hsl(0,   0%,   74%);
      --gray5-hsl:           hsl(0, 0%, 88%);
      --gray6-hsl:           hsl(0,   0%,   95%);
      --white-hsl:           hsl(0,   0%,   99%);
      --dark-blue-hsl:       hsl(223, 79%,  45%);
      --dark-blue-opac-hsl:  hsla(223, 79%,  45%, 0.1);
      --dark-blue-hover-hsl: hsl(233, 79%,  56%);
      --dark-green-hsl:      hsl(104, 89%,  28%);
      --red-hsl:             hsl(0,   79%,  63%);
    }
    
    [data-theme="dark"] {
      --gray1-hsl:           hsl(0,   0%,   95%);
      --gray4-hsl:           hsl(0,   0%,   51%);
      --gray5-hsl:           hsl(0, 0%, 31%);
      --gray6-hsl:           hsl(0,   0%,   20%);
      --white-hsl:           hsl(0,   0%,   20%);
      --dark-blue-hsl:       hsl(187, 100%, 76%); 
      --dark-blue-opac-hsl:  hsla(187, 100%, 76%, 0.1);
      --dark-blue-hover-hsl: hsl(187, 79%,  86%);
      --dark-green-hsl:      hsl(117, 85%,  76%);
      --red-hsl:             hsl(0,   79%,  63%);
    }
    
    *, html {
      font-family: 'Roboto', sans-serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      color: var(--gray1-hsl);
      background-color: var(--white-hsl);
    }
    
    h1 {
      font-size: 1.5rem;
      font-weight: 800;
    }
    
    .logins-container {
      display: flex;
      justify-content: center;
    }
    
    .login {
      margin: 3rem;
      min-width: 23rem;
      max-width: 25rem;
      background: var(--white-hsl);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; 
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.36) 5px 3px 6px, 
                  rgba(0, 0, 0, 0.43) 0px 3px 6px;
    }
    
    h2 {
      font-size: 1.5rem;
      padding-bottom: 0.5rem;
    }
    
    button:focus,
    button:active,
    input:focus,
    input:active {
      border-color: transparent;
      outline: none;
    }
    
    .input{
      border-style: hidden;
      margin-top: 0.75rem;
    }
    
    #email {
      width: 100%;
    }
    
    .login-form {
      width: 100%;
    }
    
    .login-form input {
      border-radius: 5px;
      padding: 10px 5px;
      border: 1px solid var(--gray1-hsl);
      margin-top: 5px;
      filter: none;
      transition: all 0.1s ease-in-out;
    }
    
    /* Styling for standard input elements with border */
    
    .login-form .input-standard:hover {
      border-color: var(--gray4);
    }
    
    .login-form .input-standard:not(:placeholder-shown) {
      border-color: var(--dark-blue-hsl);
    }
    
    .login-form .input-standard:focus,
    .login-form .input-standard:active {
      border-color: var(--dark-blue-hsl);
      filter: drop-shadow(0px 0px 3px var(--dark-blue-hsl));
    }
    
    .login-form .validation:not(:focus):invalid:not(:placeholder-shown) {
      border: 1px solid var(--red);
      filter: drop-shadow(0px 0px 3px var(--red));
    }
    
    .login-form .validation:not(:focus):not(:invalid):not(:placeholder-shown) {
      border: 1px solid var(--dark-green-hsl);
      box-sizing: border-box;
      filter: drop-shadow(0px 0px 3px var(--dark-green-hsl))
    }
    
    .login-form label {
      font-size: 1.1rem;
    }
    
    .btn {
      background-color: var(--dark-blue-hsl);
      color: var(--gray6-hsl);
      margin-top: 2rem;
      border: none;
      border-radius: 5px;
      height: 40px;
      width: 100%;
      transition: all 0.1s ease-in-out;
    }
    
    .btn:hover:not(.disabled) {
      background-color: var(--dark-blue-hover-hsl);
    }
    
    .btn:active:not(.disabled) {
      box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    .btn:focus {
      border: 3px solid var(--gray1-hsl);
    }
    
    .password-field {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    #password {
      width: 100%;
      flex: 3;
    }
    
    .btn-secondary,
    .btn-secondary:focus {
      background-color: transparent;
      border: 1px solid var(--dark-blue-hsl);
      border-radius: 5px;
      color: var(--gray1-hsl);
      height: 40px;
      font-size: 0.8rem;
      margin-left: 15px;
      margin-top: 5px;
      flex: 1;
      transition: all 0.1s ease-in-out;
    }
    
    .btn-secondary:hover:not(.disabled) {
      filter: drop-shadow(2px 3px 1px var(--gray5-hsl));
    }
    
    .btn-secondary:active:not(.disabled) {
      background-color: var(--dark-blue-opac-hsl);
    }
    
    .notification {
      font-size: 0.8rem;
      margin-top: 2px;
    }
    
    .notification:empty:before {
      content: ' ';
      white-space: pre;
    }
    
    
    
    /* Styling for login notification message */
    
    .login-validity-notification {
      background-color: var(--red);
      color: var(--white-hsl);
      display: none;
      align-items: center;
      font-size: 0.875rem;
      border-radius: 5px;
    }
    
    .login-validity-notification i {
      background-color: inherit;
      margin: 1rem;
      font-size: 2rem;
      color: inherit;
    }
    
    .login-validity-notification p {
      background-color: inherit;
      color: inherit;
      max-width: 220px;
      padding-bottom: 0.5rem;
      padding-top: 0.5rem;
    }
    
    
    
    /* Styling for password forgot */
    
    #forgot-password {
      font-size: 0.68rem;
      color: var(--dark-blue-hsl);
      text-decoration: underline;
    }
    
    #forgot-password:hover {
      font-size: 0.68rem;
      color: var(--dark-blue-hover-hsl);
      cursor: pointer;
    } 
    
    .info {
      max-width: 25rem;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .info  p:first-child {
      margin-bottom: 5px;
    }
    
    .disabled {
      opacity: 0.4;
    }
    
    /* Styling toggle switch */
    .theme-switch-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 1rem;
    }
    
    .theme-switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
    }
    
    .theme-switch input {
    display:none;
    }
    
    .slider {
    background-color: var(--dark-blue-hsl);
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: .4s;
    }
    
    .slider:before {
    background-color: var(--gray6-hsl);
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: .4s;
    width: 26px;
    }
    
    input:checked + .slider {
    background-color: var(--dark-blue-hsl);
    }
    
    input:checked + .slider:before {
    transform: translateX(26px);
    }
    
    .slider.round {
    border-radius: 34px;
    }
    
    .slider.round:before {
    border-radius: 50%;
    }
    
    em {
    font-size: 12px;
    padding-left: 4px;
    text-decoration: none;
    color: var(--gray1-hsl);
    font-family: "Poppins Regular", fallback, sans-serif;
    }
    `

    head.appendChild(style)

    
    container.innerHTML = `
      <h2>Login</h2>
      <form class="login-form" action="">

        <div class="login-validity-notification">
          <i class="fas"></i>
          <p class="login-validity-message"></p>
        </div> 

        <div class="input email-input">
          <label for="email">E-Mail</label>
          <br>
          <input type="email" name="email" id="email" class="input-standard validation" placeholder="example@mail.com" pattern=".+@.+\..+" required>
          <p class="notification email-validity-notification"></p>
        </div>

        <div class="input password-input">
          <label for="password">Passwort</label>
          <br>
          <div class="password-field">
            <input class="input-standard" type="password" name="password" id="password" placeholder="P4$$word">
            <button id="show-pw-btn" type="button" class="btn-secondary show-password-btn disabled">show</button>
          </div>
          <a id="forgot-password" href="#">Forgot E-Mail or Password?</a>             
        </div>  

        <button class="login-submit btn disabled" type="submit" disabled>Login</button>
        
      </form>
    `

    afterRender()
  }
}




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