import { registerNotificationProjector } from '../../subprojectors/notificationProjector.js'
import { toggleColor } from '../../utils/toggleColor.js'

export { setupNotificationElements }


/**
 * 
 * @param {register} register-model 
 * @param {emailInputElement} emailInputElement 
 * @returns email, password and confirm pw notification
 * @description Initializes Notifiaction elements
 */
const setupNotificationElements = (register, emailInputElement) => {

  const emailValidityNotificiation = registerNotificationProjector(
    register, 
    { 
      onNotificationChange: register.onEmailValidNotificationChanged, 
      getNotification:      register.getEmailValidNotification 
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

  setupConfirmPwMatchNotification(register, confirmPwMatchNotification)

  return {
    emailValidityNotificiation,
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