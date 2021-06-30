import { ObservableList } from '../observable/observable.js'
import { Attribute, LABEL, VALID, VALUE } from '../presentationModel/presentationModel.js'
import { formProjector } from './mainProjector/formProjector.js'

import { setLabel } from './utils/attrLabels.js'

export { SecondFormController, SecondFormView }

const SECOND_ALL_ATTRIBUTES = [
  {
    fieldSet: { id: 'aboutYou', legend: 'About you:',
      inputFields: [
        { id: 'email', type: 'text', placeholder: 'example@mail.com' },
        { id: 'password', type: 'password' },
      ],
    },  
  },
  {
    fieldSet: { id: 'reminder', legend: 'Set a time for your reminder:',
      inputFields: [
        { id: 'time', type: 'time' }, 
      ],
    },
    
  },
  {
    fieldSet: { id: 'meal', legend: 'Which meal do you like?:',
      inputFields: [
        { id: 'checkbox1', type: 'checkbox' },
        { id: 'checkbox2', type: 'checkbox' },
      ],
    },
  },
  {
    fieldSet: { id: 'car', legend: 'Choose your favourite car:',
      inputFields: [
        { id: 'radio1', type: 'radio', name: 'example' }, // Radio buttons require the 'name' attribute in order to be grouped
        { id: 'radio2', type: 'radio', name: 'example' }, 
        { id: 'radio3', type: 'radio',  name: 'example' },
      ],
    },
  },
  {
    submit: { id: 'send', type: 'button', onclick: () => console.log('Form submitted') }
  },
]

const SecondFormController = () => {

  const Form = () => {

    const emailAttr = Attribute('')
    setLabel(emailAttr, 'Email')

    const passwordAttr = Attribute('')
    setLabel(passwordAttr, 'Password')

    const timeAttr = Attribute('')
    setLabel(timeAttr, 'Time')

    const checkBox1Attr = Attribute('')
    setLabel(checkBox1Attr, 'Spaghetti')
    
    const checkBox2Attr = Attribute('')
    setLabel(checkBox2Attr, 'Cordon Bleu')

    const radio1Attr = Attribute('')
    setLabel(radio1Attr, 'Mercedes')
    
    const radio2Attr = Attribute('')
    setLabel(radio2Attr, 'Audi')

    const radio3Attr = Attribute('')
    setLabel(radio3Attr, 'Ferrari')

    const sendAttr = Attribute('Send')
    setLabel(sendAttr, '')

    return {
      email:        emailAttr,
      password:     passwordAttr,
      time:         timeAttr,
      checkbox1:    checkBox1Attr,
      checkbox2:    checkBox2Attr,
      radio1:       radio1Attr,
      radio2:       radio2Attr,
      radio3:       radio3Attr,
      send:         sendAttr,
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

const SecondFormView = (FormController, rootElement) => {

  const render = form => formProjector(FormController, rootElement, form, SECOND_ALL_ATTRIBUTES)

  FormController.onFormAdd(render)
}