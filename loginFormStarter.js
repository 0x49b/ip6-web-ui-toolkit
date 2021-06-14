import { LoginController, LoginFormView } from './login.js'

const loginController = LoginController()

LoginFormView(loginController, document.getElementById('login'))

loginController.addLoginForm()