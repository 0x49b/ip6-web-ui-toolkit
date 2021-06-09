import {formProjector, inputProjector} from './projector/projectors.js'

const root = document.querySelector('.form')

// Creating input fields via inputProjector
const emailInput = document.querySelector('.email')
const emailInputProjected = inputProjector(emailInput, 'email', 'text', 'example@mail.com', '.+@.+\\..+', 'Invalid Mail')

const passwordInput = document.querySelector('.password')
const passwordInputProjected = inputProjector(passwordInput, 'password', 'password', 'P4$$word')

// const dateInput = document.querySelector('.date')
// const dateInputProjected = inputProjector(dateInput, 'date', 'date')


// Creating form via formProjector with the recent created Inputfields
formProjector(root, 'Login', [emailInputProjected, passwordInputProjected])

