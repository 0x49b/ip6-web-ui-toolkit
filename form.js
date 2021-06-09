import { Attribute } from "./presentationModel/presentationModel.js"

const LoginForm = () => {
  const emailInputAttr = Attribute('example@mail.com')
  emailInputAttr.getObs('label').setValue('E-Mail')

  const passwordInputAttr = Attribute('P4$$word')
  passwordInputAttr.getObs('label').setValue('Password')

  const submitBtnAttr = Attribute('Login')
  submitBtnAttr.getObs('label').setValue('Login')

  return {
    emailInput:           emailInputAttr,
    passwordInput:        passwordInputAttr,
    submitBtn:            submitBtnAttr
  }
}

