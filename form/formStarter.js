import { FirstFormController, FirstFormView } from './firstForm.js'
import { SecondFormController, SecondFormView } from './secondForm.js'
import { FirstFormControllerV2, FirstFormViewV2 } from './firstFormV2.js'


// // First Form
// const firstFormController = FirstFormController()

// const firstRootElement = document.getElementById('form')

// FirstFormView(firstFormController, firstRootElement)

// firstFormController.addForm()


// // Second Form
// const secondFormController = SecondFormController()

// const secondRootElement = document.getElementById('form2')

// SecondFormView(secondFormController, secondRootElement)

// secondFormController.addForm()


// First Form V2
const firstFormV2Controller = FirstFormControllerV2()

const firstV2RootElement = document.getElementById('formV2')

FirstFormViewV2(firstFormV2Controller, firstV2RootElement)

firstFormV2Controller.addForm()