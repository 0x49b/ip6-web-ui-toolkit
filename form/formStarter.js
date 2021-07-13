import { FormController, FormView } from './formController.js'


// First Form V2
const formController = FormController()

const firstV2RootElement = document.getElementById('formV2')

FormView(formController, firstV2RootElement)

formController.addForm()