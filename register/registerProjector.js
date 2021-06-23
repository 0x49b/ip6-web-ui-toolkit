export { registerProjector }

const registerProjector = (registerController, rootElement, register) => {

  // -------------Register Button-------------
  const registerButton = document.createElement('button')
  registerButton.innerHTML = 'Register'

  register.onclick = () => {
    // TODO: API Call auf den Server
  }

  // -------------Input Elements-------------
  const [ emailInputElement, emailLabelElement ] = registerTextProjector(register, 'Email')
  const [ passwordInputElement, passwordLabelElement ] = registerPasswordProjector(register, 'Password')
  const [ confirmPasswordInputElement, confirmPasswordLabelElement ] = registerPasswordProjector(register, 'Confirm Password (optional)')

  passwordInputElement.oninput = () => register.setPassword(passwordInputElement.value)

  register.onPasswordChanged( () => passwordInputElement.value = register.getPassword() )

  register.onPasswordValidityChanged(
    valid => valid
      ? passwordInputElement.classList.add('valid')
      : passwordInputElement.classList.remove('valid')
  )

  confirmPasswordInputElement.oninput = () => register.setConfirmPassword(confirmPasswordInputElement.value)

  register.onConfirmPasswordChanged( () => confirmPasswordInputElement.value = register.getConfirmPassword() )


  // -------------Form validity-------------
  register.onFormValidityChanged(
    valid => valid
      ? registerButton.classList.remove('disabled')
      : registerButton.classList.add('disabled')
  )

  // -------------Show Password Buttons-------------
  const showPasswordButton = registerShowButtonProjector(register)
  const showConfirmPasswordButton = registerShowButtonProjector(register)

  showPasswordButton.onclick = () => passwordInputElement.focus()
  showConfirmPasswordButton.onclick = () => confirmPasswordInputElement.focus()

  register.onShowPwChanged( () => {
    const type = register.getShowPw()
      ? 'text'
      : 'password'
    passwordInputElement.type = type
    confirmPasswordInputElement.type = type
  })

  // -------------Notifications-------------
  const emailValidityNotificiation = registerNotificationProjector(register)
  const passwordStrengthNotification = registerNotificationProjector(register)
  const confirmPwMatchNotification = registerNotificationProjector(register)

  // Syncing innerHTML of all 3 notifications with observer
  register.onEmailValidNotificationChanged( 
    () => emailValidityNotificiation.innerHTML = register.getEmailValidNotification()
  )
  register.onPwStrengthNotificationChanged( 
    () => passwordStrengthNotification.innerHTML = register.getPwStrengthNotification() 
  )
  register.onConfirmPwMatchNotificationChanged( 
    () => confirmPwMatchNotification.innerHTML = register.getConfirmPwMatchNotification() 
  )

  emailInputElement.onchange = () => {
    !register.getEmailValidity()
      ? register.setEmailValidNotification('Malformed Email')
      : register.setEmailValidNotification('')
  }

  register.onEmailValidityChanged( valid => {
    if(valid) return register.setEmailValidNotification('')
  })

  register.onPasswordChanged(() => {
    const pwStrength = register.getPwStrength()
    const notificationMessage = pwStrength === 0
      ? 'Hint: Type the strongest password you can'
      : pwStrength < 5
        ? `Missing ${6-pwStrength} more criterias`
        : pwStrength === 5
          ? 'Add a personal touch for stronger password'
          : "You're password is now strong enough!"

    register.setPwStrengthNotification(notificationMessage)
  })

  register.onConfirmPasswordChanged( () => {
    if(!register.getConfirmPassword()) return register.setConfirmPwMatchNotification('')

    if (register.getConfirmPassword() === register.getPassword()) {
      register.setConfirmPwMatchNotification('Passwords match!')
      toggleColor(confirmPwMatchNotification, true)
    } else if (register.getPassword().startsWith(register.getConfirmPassword())) {
      register.setConfirmPwMatchNotification("You're on a good way!")
      toggleColor(confirmPwMatchNotification, null)
    } else {
      register.setConfirmPwMatchNotification("oops! There seems to be a typo")
      toggleColor(confirmPwMatchNotification, false)
    }
  })

  // -------------Strength Lines-------------
  let strengthLines = Array.from('x'.repeat(6))  // Create an array with a length of 6

  strengthLines = strengthLines.map(line => registerStrengthLineProjector(register)) // Fill the array with strengthlines

  // Get the div container from DOM and append all strengthlines to it
  const strengthLinesContainer = rootElement.querySelector('.strength-lines')
  strengthLines.forEach(line => strengthLinesContainer.appendChild(line))

  register.onPasswordChanged( () => {
    const pwStrength = register.getPwStrength()

    let color = 'line-bg-default';
    [...strengthLines].forEach(line => line.classList.add(color));
    [...strengthLines].forEach(line => line.classList.remove('line-bg-red'));
    [...strengthLines].forEach(line => line.classList.remove('line-bg-orange'));
    [...strengthLines].forEach(line => line.classList.remove('line-bg-green'))

    if(pwStrength === 1)                  color = 'line-bg-red'
    if(pwStrength > 1 && pwStrength < 6)  color = 'line-bg-orange'
    if(pwStrength === 6)                  color = 'line-bg-green';

    [...strengthLines].slice(0, pwStrength).forEach(line => line.classList.remove('line-bg-default'));
    [...strengthLines].slice(0, pwStrength).forEach(line => line.classList.add(color))
  })

  // -------------Criterias-------------
  const criteriaLabels = ['lowercase', 'uppercase', 'number', 'symbols', '6 Characters']
  const criteriaElements = criteriaLabels.map(label => registerCriteriaProjector(register, label))

  const criteriaContainer = rootElement.querySelector('.pw-criterias')

  criteriaElements.forEach(element => criteriaContainer.appendChild(element))

  const toggleColor = (element, isFulfilled) => {
    if(isFulfilled === null) return element.classList.remove('green', 'red')
    if(!isFulfilled){
      element.classList.remove('green')
      element.classList.add('red')
    } else {
      element.classList.add('green')
      element.classList.remove('red')
    }
  }

  register.onPasswordChanged( () => {

    const patterns = register.getPatterns()

    patterns.forEach(pattern => {

      const currentCriteriaElement = criteriaElements.filter(element => element.innerHTML.includes(pattern.name))[0]

      if(currentCriteriaElement){ // Because we do not give feedback about the 8 char pattern

        !register.getPassword() // If Password input is empty, remove all color styles
          ? criteriaElements.forEach(element => toggleColor(element, null)) 
          : toggleColor(currentCriteriaElement, pattern.isFulfilled)
      }
    })
    
  })


  // -------------Setting up the HTML-------------
  rootElement.appendChild(emailLabelElement)
  rootElement.appendChild(emailInputElement)
  rootElement.appendChild(emailValidityNotificiation)
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(passwordLabelElement)
  rootElement.appendChild(passwordInputElement)
  rootElement.appendChild(showPasswordButton)
  rootElement.appendChild(strengthLinesContainer)
  rootElement.appendChild(passwordStrengthNotification)
  rootElement.appendChild(criteriaContainer)  
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(confirmPasswordLabelElement)
  rootElement.appendChild(confirmPasswordInputElement)
  rootElement.appendChild(showConfirmPasswordButton)
  rootElement.appendChild(confirmPwMatchNotification)
  rootElement.appendChild(document.createElement('br'))
  rootElement.appendChild(registerButton)
}

const registerTextProjector = (register, label) => {

  const inputElement = document.createElement('input')
  inputElement.type = 'text'
  inputElement.id   = label.toLowerCase()

  const labelElement = document.createElement('label')
  labelElement.htmlFor = label.toLowerCase()
  labelElement.innerHTML = label

  inputElement.oninput = () => register.setEmail(inputElement.value)

  register.onEmailChanged( () => inputElement.value = register.getEmail() )

  register.onEmailValidityChanged(
    valid => valid
      ? inputElement.classList.add('valid')
      : inputElement.classList.remove('valid')
  )

  return [ inputElement, labelElement ]
}

const registerPasswordProjector = (register, label) => {

  const inputElement = document.createElement('input')
  inputElement.type = 'password'
  inputElement.id = label.toLowerCase()

  const labelElement = document.createElement('label')
  labelElement.htmlFor = label.toLowerCase()
  labelElement.innerHTML = label

  return [ inputElement, labelElement ]
}

const registerShowButtonProjector = register => {

  const buttonElement = document.createElement('button')
  buttonElement.innerHTML = 'show'

  buttonElement.addEventListener('click', () => {
    register.setShowPw(!register.getShowPw())
  })

  register.onShowPwChanged( () => buttonElement.innerHTML = register.getShowPw() ? 'hide' : 'show')

  return buttonElement
}

const registerNotificationProjector = register => {

  const pElement = document.createElement('p')

  return pElement
}

const registerStrengthLineProjector = register => {

  const divElement = document.createElement('div')

  divElement.classList.add('line')

  return divElement
}

const registerCriteriaProjector = (register, label) => {

  const pElement    = document.createElement('p')
  const spanElement = document.createElement('span')

  spanElement.classList.add('cross')

  pElement.appendChild(spanElement)
  pElement.innerHTML = `
    <span></span>
    ${label}
  `
  pElement.querySelector('span').replaceWith(spanElement)

  return pElement
}