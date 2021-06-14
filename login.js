import { ObservableList } from "./observable/observable.js"
import { Attribute, VALID, VALUE, VISIBILITY } from "./presentationModel/presentationModel.js"
import { loginFormProjector } from "./projector/projectors.js"

export { LoginController, LoginFormView }

const LoginController = () => {

  const LoginForm = () => {
    const emailAttr       = Attribute('')
    const pwAttr          = Attribute('')
    const formAttr        = Attribute(false)
    const showAttr        = Attribute(false)
    const loginSucessAttr = Attribute(false)

    const updateFormValidity = () => {
      emailAttr.getObs(VALID).getValue() && pwAttr.getObs(VALID).getValue()
        ? formAttr.getObs(VALID).setValue(true)
        : formAttr.getObs(VALID).setValue(false)
    }

    emailAttr.getObs(VALUE).onChange( updateFormValidity )
    pwAttr   .getObs(VALUE).onChange( updateFormValidity )

    emailAttr.setValidator( input => /.+@.+\..+/.test(input) )
    pwAttr.setValidator( input => input.length >= 3 )

    //TODO Needs login functionality when login button is clicked
    const loginAttempt = () => {
      emailAttr.getObs(VALUE).getValue() === 'example@mail.com' && pwAttr.getObs(VALUE).getValue() === 'P4$$word'
        ? loginSucessAttr.getObs(VALID).setValue(true)
        : loginSucessAttr.getObs(VALID).setValue(false)
    }


    return {
      onFormValidityChanged:     formAttr.getObs(VALID).onChange,
      getEmail:                  emailAttr.getObs(VALUE).getValue,
      setEmail:                  emailAttr.getObs(VALUE).setValue,
      onEmailChanged:            emailAttr.getObs(VALUE).onChange,
      onEmailValidityChanged:    emailAttr.getObs(VALID).onChange,
      getPassword:               pwAttr.getObs(VALUE).getValue,
      setPassword:               pwAttr.getObs(VALUE).setValue,
      onPasswordChanged:         pwAttr.getObs(VALUE).onChange,
      getVisibility:             showAttr.getObs(VISIBILITY).getValue,
      setVisibility:             showAttr.getObs(VISIBILITY).setValue,
      onVisibilityChanged:       showAttr.getObs(VISIBILITY).onChange,
      onLogin:                   loginAttempt,
      getLoginSuccess:           loginSucessAttr.getObs(VALID).getValue,
      onLoginSucessChanged:      loginSucessAttr.getObs(VALID).onChange,
    }
  }

  const loginModel = ObservableList([])

  const addLoginForm = () => {
    const newLoginForm = LoginForm()
    loginModel.add(newLoginForm)
    return newLoginForm
  }

  return {
    onLoginFormAdd: loginModel.onAdd,
    addLoginForm:   addLoginForm,
  }

}

const LoginFormView = (loginController, rootElement) => {

  const render = loginForm => loginFormProjector(loginController, rootElement, loginForm)

  loginController.onLoginFormAdd(render)
}