
const kolibri = {
  login: (container) => {

    const head = document.querySelector('head')
    const style = document.createElement('style')
    style.innerHTML = `
    :root {

        /* Colors in hsl */
        --text:                 hsl(0,   0%,   20%);
        --shadow:               hsl(0, 0%, 30%);
        --input-hover:          hsl(0, 0%, 74%);
        --shadow-contrast:      hsl(0, 0%, 88%); 
        --text-contrast:        hsl(0,   0%,   95%); 
        --background:           hsl(0,   0%,   99%);
        --primary:              hsl(223, 79%,  45%);
        --primary-opac:         hsla(223, 79%,  45%, 0.1);
        --primary-hover:        hsl(233, 79%,  56%); 
        --success:              hsl(104, 89%,  28%); 
        --error:                hsl(0,   79%,  63%); 
    }
    
    [data-theme="dark"] {
        --text:                 hsl(0,   0%,   95%);
        --gray4-hsl:            hsl(0,   0%,   51%);
        --shadow-contrast:      hsl(0, 0%, 31%);
        --text-contrast:        hsl(0,   0%,   20%);
        --background:           hsl(0,   0%,   20%);
        --primary:              hsl(187, 100%, 76%); 
        --primary-opac:         hsla(187, 100%, 76%, 0.1);
        --primary-hover:        hsl(187, 79%,  86%);
        --success:              hsl(117, 85%,  76%);
        --error:                hsl(0,   79%,  63%);
    }
    
    *, html {
        font-family: 'Roboto', sans-serif;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: var(--text);
        background-color: var(--background);
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
        background: var(--background);
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
        border: 1px solid var(--text);
        margin-top: 5px;
        filter: none;
        transition: all 0.1s ease-in-out;
    }
    
    /* Styling for standard input elements with border */
    
    .login-form .input-standard:hover {
        border-color: var(--input-hover);
    }
    
    .login-form .input-standard:not(:placeholder-shown) {
        border-color: var(--primary);
    }
    
    .login-form .input-standard:focus,
    .login-form .input-standard:active {
        border-color: var(--primary);
        filter: drop-shadow(0px 0px 3px var(--primary));
    }
    
    .login-form .validation:not(:focus):invalid:not(:placeholder-shown) {
        border: 1px solid var(--error);
        filter: drop-shadow(0px 0px 3px var(--error));
    }
    
    .login-form .validation:not(:focus):not(:invalid):not(:placeholder-shown) {
        border: 1px solid var(--success);
        box-sizing: border-box;
        filter: drop-shadow(0px 0px 3px var(--success))
    }
    
    .login-form label {
        font-size: 1.1rem;
    }
    
    .btn {
        background-color: var(--primary);
        color: var(--text-contrast);
        margin-top: 2rem;
        border: none;
        border-radius: 5px;
        height: 40px;
        width: 100%;
        transition: all 0.1s ease-in-out;
    }
    
    .btn:hover:not(.disabled) {
        background-color: var(--primary-hover);
    }
    
    .btn:active:not(.disabled) {
        box-shadow: inset 0px 4px 8px var(--color-shadow);
    }
    
    .btn:focus {
        border: 3px solid var(--text);
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
        border: 1px solid var(--primary);
        border-radius: 5px;
        color: var(--text);
        height: 40px;
        font-size: 0.8rem;
        margin-left: 15px;
        margin-top: 5px;
        flex: 1;
        transition: all 0.1s ease-in-out;
    }
    
    .btn-secondary:hover:not(.disabled) {
        filter: drop-shadow(2px 3px 1px var(--shadow-contrast));
    }
    
    .btn-secondary:active:not(.disabled) {
        background-color: var(--primary-opac);
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
        background-color: var(--error);
        color: var(--background);
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
        color: var(--primary);
    }
    
    #forgot-password:hover {
        font-size: 0.68rem;
        color: var(--primary-hover);
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
    
    
    
    
    
    
    .email-validity-notification {
        color: var(--error);
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
      background-color: var(--primary);
      bottom: 0;
      cursor: pointer;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: .4s;
    }
    
    .slider:before {
      background-color: var(--text-contrast);
      bottom: 4px;
      content: "";
      height: 26px;
      left: 4px;
      position: absolute;
      transition: .4s;
      width: 26px;
    }
    
    input:checked + .slider {
      background-color: var(--primary);
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
      color: var(--text);
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

    setupLoginJS()
  },

  register: (container) => {
    const head = document.querySelector('head')
    const style = document.createElement('style')
    style.innerHTML = `
      :root {

        /* Colors in hsl */
        --text:                 hsl(0,   0%,   20%);
        --input-hover:          hsl(0,   0%,   74%);
        --shadow-contrast:      hsl(0, 0%, 88%);
        --text-contrast:        hsl(0,   0%,   95%);
        --background:           hsl(0,   0%,   99%);
        --primary:              hsl(223, 79%,  45%);
        --primary-opac:         hsla(223, 79%,  45%, 0.1);
        --primary-hover:        hsl(233, 79%,  56%);
        --success:              hsl(104, 89%,  28%);
        --error:                hsl(0,   79%,  63%);
        --warning:              hsl(36,100%,48%,1);
    }
    
    [data-theme="dark"] {
        --text:                 hsl(0,   0%,   95%);
        --input-hover:          hsl(0,   0%,   51%);
        --shadow-contrast:      hsl(0, 0%, 31%);
        --text-contrast:        hsl(0,   0%,   20%);
        --background:           hsl(0,   0%,   20%);
        --primary:              hsl(187, 100%, 76%); 
        --primary-opac:         hsla(187, 100%, 76%, 0.1);
        --primary-hover:        hsl(187, 79%,  86%);
        --success:              hsl(117, 85%,  76%);
        --error:                hsl(0,   79%,  63%);
        --warning:              hsl(36,85%,62%,1);
    }
    
    *, html {
        font-family: 'Roboto', sans-serif;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: var(--text);
        background-color: var(--background);
    }
    
    h1 {
        font-size: 1.5rem;
        font-weight: 800;
    }
    
    .register {
        margin: 3rem;
        max-width: 25rem;
        background: var(--background);
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
    
    .register-form {
        width: 100%;
    }
    
    .register-form input{
        border-radius: 5px;
        padding: 10px 5px;
        border: 1px solid var(--text);
        margin-top: 5px;
        filter: none;
        transition: all 0.1s ease-in-out;
    
    }
    
    .register-form input:hover {
        border-color: var(--input-hover);
    }
    
    .register-form input:not(:placeholder-shown) {
        border-color: var(--primary);
    }
    
    
    
    .register-form input:focus,
    .register-form input:active {
        border-color: var(--primary);
        filter: drop-shadow(0px 0px 3px var(--primary));
    }
    
    .register-form .validation:not(:focus).invalid:not(:placeholder-shown) {
        border: 1px solid var(--error);
        filter: drop-shadow(2px 2px 3px rgba(235, 87, 87, 0.53));
    }
    
    .register-form .validation:not(:focus):not(.invalid):not(:placeholder-shown) {
        border: 1px solid var(--success);
        box-sizing: border-box;
        filter: drop-shadow(0px 0px 3px var(--success))
    }
    
    .register-form label {
        font-size: 1.1rem;
    }
    
    
    
    
    .btn {
        background-color: var(--primary);
        color: var(--text-contrast);
        margin-top: 2rem;
        border: none;
        border-radius: 5px;
        height: 40px;
        width: 100%;
        transition: all 0.1s ease-in-out;
    }
    
    .btn:hover:not(.disabled) {
        background-color: var(--primary-hover);
    }
    
    .btn:active:not(.disabled) {
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    .btn-secondary,
    .btn-secondary:focus {
        background-color: transparent;
        border: 1px solid var(--primary);
        border-radius: 5px;
        color: var(--text);
        height: 40px;
        font-size: 0.8rem;
        margin-left: 15px;
        margin-top: 5px;
        flex: 1;
        transition: all 0.1s ease-in-out;
    }
    
    .btn-secondary:hover:not(.disabled) {
        filter: drop-shadow(2px 3px 1px var(--shadow-contrast));
    }
    
    .btn-secondary:active:not(.disabled) {
        background-color: var(--primary-opac);
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
    
    .optional {
        font-size: 0.8rem;
    }
    
    .disabled {
        opacity: 0.4;
    }
    
    .password-input {
        width: 100%;
        flex: 3;
    }
    
    .notification {
        color: var(--error);
        font-size: 0.8rem;
        margin-top: 2px;
    }
    
    .notification:empty:before {
        content: ' ';
        white-space: pre;
    }
    
    .strength-notification {
        color: var(--text);
    }
    
    
    /* Strenght Lines */
    .strengthlines-container {
        margin-bottom: 4px;
    }
    
    .strength-lines{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        bottom: 2px;
        left: 0;
        right: 0 + size(calc(100% - 50px), 6px);
        margin-top: 2px;
    }
    
    .line, .line-underline {
        border: none;
        height: 6px;
        width: 95%;
        border-radius: 2px;
        transition: background-color 0.25s ease-in;
    }
    
    .bg-default {
        color: var(--text);
    }
      
    .bg-red {
        color:var(--error);
    }
      
    .bg-orange {
        color: var(--warning);
    }
      
    .bg-green {
        color: var(--success);
    }
    
    /* Classes for strength lines */
    
    .line-bg-default {
        background-color: var(--input-hover);
    }
      
    .line-bg-red {
        background-color:var(--error);
    }
      
    .line-bg-orange {
        background-color: var(--warning);
    }
      
    .line-bg-green {
        background-color: var(--success);
    }
    
    
    /* Criterias */
    
    .pw-criterias {
        font-size: 0.7rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    
    .pw-criterias p:not(:last-child) {
        margin-right: 7.5px;
    }
    
    .criteria-icon {
        margin-right: 2px;
        font-size: 10px;
    }
    
    
    /* Toggle Switch */
    
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
        background-color: var(--primary);
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: .4s;
      }
      
      .slider:before {
        background-color: var(--text-contrast);
        bottom: 4px;
        content: "";
        height: 26px;
        left: 4px;
        position: absolute;
        transition: .4s;
        width: 26px;
      }
      
      input:checked + .slider {
        background-color: var(--primary);
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
        color: var(--text);
        font-family: "Poppins Regular", fallback, sans-serif;
      }
    `

    head.appendChild(style)

    container.innerHTML = `
      <h2>Register</h2>
      <form class="register-form" action="">

        <div class="input email-input">
          <label for="email">E-Mail</label>
          <br>
          <input type="email" name="email" id="email" placeholder="example@mail.com" pattern=".+@.+\..+"
            class="validation" required>
          <p class="notification email-validity-notification"></p>
        </div>

        <div class="input password-input">
          <label for="password">Password</label>
          <br>
          <div class="password-field">
            <input type="password" name="password" id="password" placeholder="P4$$word" class="password-input" required>
            <button id="show-pw-btn" type="button" class="btn-secondary show-password-btn">show</button>
          </div>
          <div class="strengthlines-container">
            <div class="strength-lines">
              <div class="line line-bg-default"></div>
              <div class="line line-bg-default"></div>
              <div class="line line-bg-default"></div>
              <div class="line line-bg-default"></div>
              <div class="line line-bg-default"></div>
              <div class="line line-bg-default"></div>
            </div>
            <p class="strength-notification notification">Hint: Type the strongest password you can</p>
          </div>
          <div class="pw-criterias">
            <p class="criteria uppercase"> <i class="criteria-icon fas fa-times-circle"></i>uppercase</p>
            <p class="criteria lowercase"> <i class="criteria-icon fas fa-times-circle"></i>lowercase</p>
            <p class="criteria number"> <i class="criteria-icon fas fa-times-circle"></i>number</p>
            <p class="criteria symbols"> <i class="criteria-icon fas fa-times-circle"></i>symbols</p>
            <p class="criteria characters"><i class="criteria-icon fas fa-times-circle"></i>6 characters</p>
          </div>
          <label for="confirm-password">Confirm Password <span class="optional">(optional)</span></label>
          <br>
          <div class="password-field">
            <input type="password" name="password" id="confirm-password" placeholder="P4$$word" class="password-input">
            <button id="show-confirm-pw-btn" type="button" class="btn-secondary show-password-btn">show</button>
          </div>
          <p id="match-notification" class="notification"></p>
        </div>

        <button class="register-submit btn disabled" type="submit" disabled>Register</button>

      </form>
    `

    setupRegisterJS()
  }
}



const setupLoginJS = () => {
  // Used as an example for a successful login
  const email = 'example@mail.com'
  const pw    = 'P4$$word'

  // HTML Elements
  const loginForm               = document.querySelector('.login-form')
  const loginBtn                = document.querySelector('.login-submit')
  const notificationContainer   = document.querySelector('.login-validity-notification')
  const notificationMessage     = document.querySelector('.login-validity-notification p')
  const notificationIcon        = document.querySelector('.login-validity-notification i')
  const emailNotification       = document.querySelector('.email-validity-notification')
  const emailInput              = document.querySelector('#email')
  const passwordInput           = document.querySelector('#password')
  const showPwBtn               = document.querySelector('#show-pw-btn')

  // Set disable state to a button
  const disableButton = (btn, setDisable) => {
    if(setDisable) {
      btn.classList.add('disabled')
      btn.disabled = true
    } else {
      btn.classList.remove('disabled')
      btn.disabled = false
    }
  }

  // Specific function for button disabling/enabling if both input fields are valid
  const handleBtnDisablingUponInputValidity = () => {

    // Check if both, pw has a value and email is valid and has a value and change disable state to loginBtn
    const isValid = (emailInput.checkValidity() && passwordInput.value !== '')
    disableButton(loginBtn, !isValid)
  }

  // Display successful/error notification message upon login
  const showLoginNotification = (message, isSuccessful) => {
    notificationMessage.innerHTML = message
    notificationContainer.style.display = 'flex'
    notificationContainer.style.backgroundColor = isSuccessful 
      ? 'var(--success)' : 'var(--error)'
    notificationContainer.style.color = 'var(--background)'
    notificationIcon.classList.remove(
      isSuccessful ? 'fa-exclamation-circle' : 'fa-check-circle'
    )
    notificationIcon.classList.add(
      isSuccessful ? 'fa-check-circle': 'fa-exclamation-circle'
    )
  }

  // Reset states after a login attempt (except show button)
  const resetAfterLogin = () => {
    emailInput.value = ''
    passwordInput.value = ''
    loginBtn.disabled = true
    loginBtn.classList.add('disabled')
  }

  // Toggle password input field type and change the show button text
  const toggleShowBtn = () => {
    const isHidden = passwordInput.type === 'password'
    passwordInput.type = isHidden ? 'text' : 'password'
    showPwBtn.innerHTML = isHidden ? 'hide' : 'show'
  }

  // Handle login submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevents the UI from refreshing after submit

    // Simulating a login attempt with preset credentials
    const successfulLogin = (passwordInput.value === pw && emailInput.value === email)
    const message = successfulLogin 
      ? 'Login successful!'
      : "Sorry, we couldn't match your request. Your E-Mail or Password must be wrong."

    showLoginNotification(message, successfulLogin)


    // After first login attempt, enable the "show" button
    const isDisabled = showPwBtn.classList.contains('disabled') ? true : false
    disableButton(showPwBtn, !isDisabled)

    // After a login attempt, clear the input fields and disable the login button again
    resetAfterLogin()
  })

  // Handle validation of the e-mail input field
  emailInput.addEventListener('focusout', () => {
    if (!emailInput.value) return // Do nothing if input field is empty

    // Check if its valid or not and adjust the text
    const error = !emailInput.checkValidity()
    emailNotification.innerHTML = error ? 'Malformed Email' : ''
  })

  // Remove notification when user is focused on the email input field
  emailInput.addEventListener('focusin', () => {
    emailNotification.innerHTML = ''
  })

  // Handle login button disabling/enabling upon typing on the email input field
  emailInput.addEventListener('keyup', handleBtnDisablingUponInputValidity)

  // Handle login button disabling/enabling upon typing on the password input field
  passwordInput.addEventListener('keyup', handleBtnDisablingUponInputValidity)

  // Handle show password button click
  showPwBtn.addEventListener('click', () => {
    if (showPwBtn.classList.contains('disabled')) return // if disabled, do nothing

    // Toggle show button
    toggleShowBtn()
  })
}

const setupRegisterJS = () => {
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

}

window.kolibri = kolibri

global.kolibri = kolibri

export default kolibri