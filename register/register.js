import { ObservableList } from '../observable/observable.js'
import { Attribute, VALID, VALUE, VISIBILITY } from "../presentationModel/presentationModel.js"
import { registerProjector } from "./mainProjector/registerProjector.js"

export { RegisterController, RegisterView }

/**
 * 
 * @returns {{onRegisterAdd|addRegister}}
 */
const RegisterController = () => {
  
  /**
   * @typedef {Object} register-model
   * @property {String} emailAttr - Emailadress
   * @property {String} pwAttr - Password
   * @property {String} confirmPwAttr - confirm Password
   * @property {String} formAttr
   * @property {boolean} showPwBtnAttr - Indicates whether pasword is shown or not
   * @property {String} emailValidNotificationAttr - Notification that shows feedback if email is entered
   * @property {String} passwordStrengthNotificationAttr
   * @property {String} confirmPwMatchNotificationAttr
   * @property {Number} pwStrenghtAttr - Indicates strength of entered password
   * @property {Array} patternsAttr - ALl patterns that password has to match to be valid
   * @returns {register} register-model
   */
  const Register = () => {

    const emailAttr = Attribute('')
    const pwAttr = Attribute('')
    const confirmPwAttr = Attribute('')
    const formAttr = Attribute('')
    const showPwBtnAttr = Attribute(false)
    const emailValidNotificationAttr = Attribute('')
    const passwordStrengthNotificationAttr = Attribute('')
    const confirmPwMatchNotificationAttr = Attribute('')
    const pwStrenghtAttr = Attribute(0)
    const patternsAttr = Attribute([
      {
        name: 'lowercase',
        regex: /^(?=.*[a-z]).+$/,
        isFulfilled: false
      },
      {
        name: 'uppercase',
        regex: /^(?=.*[A-Z]).+$/,
        isFulfilled: false
      },
      {
        name: 'number',
        regex: /^(?=.*[\d]).+$/,
        isFulfilled: false
      },
      {
        name: 'symbols',
        regex: /([-+=_!@#$%^&*.,;:'\"<>/?`~\¦\°\§\´\¨\[\]\(\)\{\}\\\|\s])/,
        isFulfilled: false
      },
      {
        name: '6 characters',
        regex: /^.{6,}/,
        isFulfilled: false
      },
    ])

    const updateFormValidity = () => {
      const isValid = emailAttr.getObs(VALID).getValue() && pwAttr.getObs(VALID).getValue()
      formAttr.getObs(VALID).setValue(isValid)
    }

    emailAttr.getObs(VALID).onChange( updateFormValidity )
    pwAttr   .getObs(VALID).onChange( updateFormValidity )

    emailAttr.setValidator( input => /.+@.+\..+/.test(input) )

    pwAttr.setValidator( input => {

      // Checking the input by the patterns
      
      const setPatternsAttr = patternsAttr.getObs(VALUE).setValue

      patternsAttr.getObs(VALUE).getValue().forEach(pattern => {
        const oldPAtternsArray = patternsAttr.getObs(VALUE).getValue()

        pattern.regex.test(input)
          ? setPatternsAttr( oldPAtternsArray.map(
              patternItem => patternItem.name === pattern.name 
                ? {...pattern, isFulfilled: true} 
                : patternItem
          ))
          : setPatternsAttr( oldPAtternsArray.map(
              patternItem => patternItem.name === pattern.name 
                ? {...pattern, isFulfilled: false} 
                : patternItem
          ))
      })

      confirmPwAttr.setValidator( input => input === pwAttr.getObs(VALUE).getValue())

      const amountOfFulfilledPatterns = patternsAttr.getObs(VALUE).getValue().filter(pattern => pattern.isFulfilled).length

      pwStrenghtAttr.getObs(VALUE).setValue(amountOfFulfilledPatterns)


      return amountOfFulfilledPatterns === patternsAttr.getObs(VALUE).getValue().length
    })

    return {
      getFormValidity:                      formAttr.getObs(VALID).getValue,
      onFormValidityChanged:                formAttr.getObs(VALID).onChange,
      getEmail:                             emailAttr.getObs(VALUE).getValue,
      setEmail:                             emailAttr.getObs(VALUE).setValue,
      onEmailChanged:                       emailAttr.getObs(VALUE).onChange,
      getEmailValidity:                     emailAttr.getObs(VALID).getValue,
      onEmailValidityChanged:               emailAttr.getObs(VALID).onChange,
      getPassword:                          pwAttr.getObs(VALUE).getValue,
      setPassword:                          pwAttr.getObs(VALUE).setValue,
      onPasswordChanged:                    pwAttr.getObs(VALUE).onChange,
      getPasswordValidity:                  pwAttr.getObs(VALID).getValue,
      setPasswordValidity:                  pwAttr.getObs(VALID).setValue,
      onPasswordValidityChanged:            pwAttr.getObs(VALID).onChange,
      getConfirmPassword:                   confirmPwAttr.getObs(VALUE).getValue,
      setConfirmPassword:                   confirmPwAttr.getObs(VALUE).setValue,
      onConfirmPasswordChanged:             confirmPwAttr.getObs(VALUE).onChange,
      getShowPw:                            showPwBtnAttr.getObs(VALUE).getValue,
      setShowPw:                            showPwBtnAttr.getObs(VALUE).setValue,
      onShowPwChanged:                      showPwBtnAttr.getObs(VALUE).onChange,
      getEmailValidNotification:            emailValidNotificationAttr.getObs(VALUE).getValue,
      setEmailValidNotification:            emailValidNotificationAttr.getObs(VALUE).setValue,
      onEmailValidNotificationChanged:      emailValidNotificationAttr.getObs(VALUE).onChange,
      getPwStrengthNotification:            passwordStrengthNotificationAttr.getObs(VALUE).getValue,
      setPwStrengthNotification:            passwordStrengthNotificationAttr.getObs(VALUE).setValue,
      onPwStrengthNotificationChanged:      passwordStrengthNotificationAttr.getObs(VALUE).onChange,
      getConfirmPwMatchNotification:        confirmPwMatchNotificationAttr.getObs(VALUE).getValue,
      setConfirmPwMatchNotification:        confirmPwMatchNotificationAttr.getObs(VALUE).setValue,
      onConfirmPwMatchNotificationChanged:  confirmPwMatchNotificationAttr.getObs(VALUE).onChange,
      getPwStrength:                        pwStrenghtAttr.getObs(VALUE).getValue,
      setPwStrength:                        pwStrenghtAttr.getObs(VALUE).setValue,
      onPwStrengthChanged:                  pwStrenghtAttr.getObs(VALUE).onChange,
      getPatterns:                          patternsAttr.getObs(VALUE).getValue,
      setPatterns:                          patternsAttr.getObs(VALUE).setValue,
      onPatternsChanged:                    patternsAttr.getObs(VALUE).onChange,
    }  
  }

  const registerModel = ObservableList([])

  /**
   * 
   * @returns {register} newRegister
   */
  const addRegister = () => {
    const newRegister = Register()
    registerModel.add(newRegister)
    return newRegister
  }

  return {
    onRegisterAdd: registerModel.onAdd,
    addRegister:   addRegister,
  }
  
}

const RegisterView = (RegisterController, rootElement) => {
  
  const render = register => registerProjector(RegisterController, rootElement, register)

  RegisterController.onRegisterAdd(render)
}