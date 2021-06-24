// Utils
import { toggleColor } from './utils/toggleColor.js'

// SubProjectors
import { registerCriteriaProjector } from './subprojectors/criteriaProjector.js'
import { registerStrengthLineProjector } from './subprojectors/strengthLineProjector.js'
import { registerNotificationProjector } from './subprojectors/notificationProjector.js'
import { registerShowButtonProjector } from './subprojectors/showButtonProjector.js'
import { registerPasswordProjector } from './subprojectors/passwordProjector.js'
import { registerTextProjector } from './subprojectors/textProjector.js'
import { registerButtonProjector } from './subprojectors/buttonProjector.js'

export { registerProjector }

const BGRED    = 'line-bg-red'
const BGORANGE = 'line-bg-orange'
const BGGREEN  = 'line-bg-green'

const registerProjector = (registerController, rootElement, register) => {

  // -------------Register Button-------------
  const registerButton = registerButtonProjector(register)

  

  // -------------Input Elements-------------
  const {
    emailInputElement,
    emailLabelElement,
    passwordInputElement,
    passwordLabelElement,
    confirmPasswordInputElement,
    confirmPasswordLabelElement,
  } = initialiseInputElements(register)

  

  // -------------Show Password Buttons-------------
  const {
    showPasswordButton,
    showConfirmPasswordButton
  } = initialiseShowPwButtons(register, passwordInputElement, confirmPasswordInputElement)



  // -------------Notifications-------------
  const {
    emailValidityNotificiation,
    passwordStrengthNotification,
    confirmPwMatchNotification
  } = intialiseNotifications(register, emailInputElement)



  // -------------Strength Lines-------------
  const strengthLinesContainer = initialiseStrengthLines(register, rootElement)



  // -------------Criterias-------------
  const criteriaContainer = initialiseCriterias(register, rootElement)


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




// -------------Helper Functions for setting up the sections-------------


// -------------Input Elements-------------
const initialiseInputElements = register => {
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

  return {
    emailInputElement,
    emailLabelElement,
    passwordInputElement,
    passwordLabelElement,
    confirmPasswordInputElement,
    confirmPasswordLabelElement,
  }
}



// -------------Show Buttons-------------
const initialiseShowPwButtons = (register, passwordInputElement, confirmPasswordInputElement) => {
  const showPasswordButton = registerShowButtonProjector(register)
  const showConfirmPasswordButton = registerShowButtonProjector(register)

  showPasswordButton.onclick = () => passwordInputElement.focus()
  showConfirmPasswordButton.onclick = () => confirmPasswordInputElement.focus()

  return {
    showPasswordButton,
    showConfirmPasswordButton
  }
}



// -------------Notifications-------------
const intialiseNotifications = (register, emailInputElement) => {
  const emailValidityNotificiation = registerNotificationProjector(
    register, 
    { 
      onNotificationChange: register.onEmailValidNotificationChanged, 
      getNotification:      register.getEmailValidNotification 
    }
  )
  const passwordStrengthNotification = registerNotificationProjector(
    register, 
    { 
      onNotificationChange: register.onPwStrengthNotificationChanged, 
      getNotification:      register.getPwStrengthNotification 
    }
  )
  const confirmPwMatchNotification = registerNotificationProjector(
    register, 
    { 
      onNotificationChange: register.onConfirmPwMatchNotificationChanged, 
      getNotification:      register.getConfirmPwMatchNotification
    }
  )

  setupEmailValidityNotification(register, emailInputElement)

  setupPasswordStrengthNotification(register)

  setupConfirmPwMatchNotification(register, confirmPwMatchNotification)

  return {
    emailValidityNotificiation,
    passwordStrengthNotification,
    confirmPwMatchNotification
  }
}

const setupEmailValidityNotification = (register, emailInputElement) => {
  emailInputElement.onchange = () => {
    if(!register.getEmail()) return register.setEmailValidNotification('')
    !register.getEmailValidity()
      ? register.setEmailValidNotification('Malformed Email')
      : register.setEmailValidNotification('')
  }

  register.onEmailValidityChanged( valid => {
    if(valid) return register.setEmailValidNotification('')
  })
}

const setupPasswordStrengthNotification = register => {
  register.onPasswordChanged(() => {
    const pwStrength = register.getPwStrength()
    const notificationMessage = pwStrength === 0
      ? 'Hint: Type the strongest password you can'
      : pwStrength < 5
        ? `Missing ${5-pwStrength} more criterias`
        : pwStrength === 5
          ? 'Add a personal touch for stronger password'
          : "You're password is now strong enough!"

    register.setPwStrengthNotification(notificationMessage)
  })
}

const setupConfirmPwMatchNotification = (register, confirmPwMatchNotification) => {
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
}



// -------------Strength Lines-------------
const initialiseStrengthLines = (register, rootElement) => {
  let strengthLines = Array.from('x'.repeat(6))  // Create an array with a length of 6

  strengthLines = strengthLines.map(line => registerStrengthLineProjector(register)) // Fill the array with strengthlineElements

  // Get the div container from DOM and append all strengthlines to it
  const strengthLinesContainer = rootElement.querySelector('.strength-lines')
  strengthLines.forEach(line => strengthLinesContainer.appendChild(line))

  coloriseStrengLines(register, strengthLines)

  return strengthLinesContainer
}

const coloriseStrengLines = (register, strengthLines) => {
  register.onPasswordChanged( () => {
    const pwStrength = register.getPwStrength()

    resetBackgroundColors(strengthLines)

    let color = BGRED
    if(pwStrength > 1 && pwStrength < 6)  color = BGORANGE
    if(pwStrength === 6)                  color = BGGREEN;

    [...strengthLines].slice(0, pwStrength).forEach(line => line.classList.add(color))
  })
}

const resetBackgroundColors = strengthLines => {
  [...strengthLines].forEach(line => line.classList.remove(BGRED));
  [...strengthLines].forEach(line => line.classList.remove(BGORANGE));
  [...strengthLines].forEach(line => line.classList.remove(BGGREEN))
}


// -------------Criterias-------------
const initialiseCriterias = (register, rootElement) => {

  const patterns = register.getPatterns()
  const criteriaElements = patterns.map(pattern => registerCriteriaProjector(register, pattern.name))

  const criteriaContainer = rootElement.querySelector('.pw-criterias')
  criteriaElements.forEach(element => criteriaContainer.appendChild(element))

  return criteriaContainer
}