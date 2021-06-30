import { ObservableList } from '../observable/observable.js'
import { Attribute, LABEL, VALID, VALUE } from '../presentationModel/presentationModel.js'
import { formProjector } from './mainProjector/formProjector.js'

import { setLabel } from './utils/attrLabels.js'

export { FirstFormController, FirstFormView }

const FIRST_ALL_ATTRIBUTES = [
  {
    fieldSet: { id: 'personalia', legend: 'Personalia:', 
      inputFields: [
        { id: 'firstname', type: 'text' },
        { id: 'lastname', type: 'text' },
      ],
      fieldSet: { id: 'detailedPersonalia', legend: 'Detailed Personalia:',
        inputFields: [
          { id: 'eyeColor', type: 'color' },
        ],
      },
      // These input fields will be appended after the nested fieldset
      appendingInputFields: [  
        { id: 'birthDate', type: 'date' },
      ],
    },  
  },
  {
    fieldSet: { id: 'meeting', legend: 'Next Meeting:',
      inputFields: [
        { id: 'date', type: 'date' }, 
        { id: 'time', type: 'time' },
      ],
    },
    
  },
  {
    fieldSet: { id: 'miscellaneous', legend: 'Miscellaneous:',
      inputFields: [
        { id: 'number', type: 'number' }, 
        { id: 'color', type: 'color'},
        { id: 'phone', type: 'tel', placeholder: '123-45-678', description: 'Format: 123-45-678' },
      ],
    },  
  },
  {
    submit: { id: 'submit', type: 'submit', onclick: () => console.log('submitted') }
  }
]

const FirstFormController = () => {

  const Form = () => {

    const firstNameAttr = Attribute('Test Name')
    setLabel(firstNameAttr, 'First Name')

    const lastNameAttr = Attribute('')
    setLabel(lastNameAttr, 'Last Name')

    const eyeClrAttr = Attribute('')
    setLabel(eyeClrAttr, 'Eye Color')

    const birthDateAttr = Attribute('')
    setLabel(birthDateAttr, 'Date of Birth')

    const meetingDateAttr = Attribute('')
    setLabel(meetingDateAttr, 'Date')

    const meetingTimeAttr = Attribute()
    setLabel(meetingTimeAttr, 'Time')

    const numberAttr = Attribute('')
    setLabel(numberAttr, 'Number')

    const colorAttr = Attribute()
    setLabel(colorAttr, 'Color')

    const phoneAttr = Attribute()
    setLabel(phoneAttr, 'Phone')

    const submitAttr = Attribute('Submit this form')
    setLabel(submitAttr, '')

    numberAttr.setValidator( input => input.length >= 3 )
    phoneAttr.setValidator( input => /[0-9]{3}-[0-9]{2}-[0-9]{3}/.test(input) )

    return {
      firstname:  firstNameAttr,
      lastname:   lastNameAttr,
      eyeColor:   eyeClrAttr,
      birthDate:  birthDateAttr,
      date:       meetingDateAttr,
      time:       meetingTimeAttr,
      number:     numberAttr,
      color:      colorAttr,
      phone:      phoneAttr,
      submit:     submitAttr,
    }
  }

  const formModel = ObservableList([])

  const addForm = () => {
    const newForm = Form()
    formModel.add(newForm)
    return newForm
  }

  return {
    onFormAdd: formModel.onAdd,
    addForm:   addForm,
  }
}

const FirstFormView = (FormController, rootElement) => {

  const render = form => formProjector(FormController, rootElement, form, FIRST_ALL_ATTRIBUTES)

  FormController.onFormAdd(render)
}