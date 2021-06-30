import { VALID, VALUE, LABEL, EDITABLE } from '../../presentationModel/presentationModel.js'

export { formProjector }

const className = 'formContent'

const bindInput = (attribute, inputElement) => {

  inputElement.oninput = () => attribute.getObs(VALUE).setValue(inputElement.value)

  attribute.getObs(VALUE).onChange( input => inputElement.value = input)

  attribute.getObs(VALID).onChange(
    valid => valid
      ? inputElement.classList.add(VALID)
      : inputElement.classList.remove(VALID)
  )

  attribute.getObs(EDITABLE, true).onChange(
    isEditable => isEditable
      ? inputElement.readOnly = false
      : inputElement.readOnly = true
  )

  attribute.getObs(LABEL).onChange(label => inputElement.title = label)
}


const setUpInputField = (inputFieldConfig, form) => {

  const labelElement = document.createElement('label')
  labelElement.htmlFor = inputFieldConfig.id

  const inputElement = document.createElement('input')
  inputElement.type = inputFieldConfig.type
  inputElement.id   = inputFieldConfig.id
  inputElement.name = inputFieldConfig.name
    ? inputFieldConfig.name
    : ''
  inputElement.placeholder = inputFieldConfig.placeholder 
    ? inputFieldConfig.placeholder 
    : ''

  if(inputFieldConfig.type === 'button'){
    inputElement.onclick = inputFieldConfig.onclick
  }

  form[inputFieldConfig.id].getObs(LABEL).onChange(label => labelElement.textContent = label)

  bindInput(form[inputFieldConfig.id], inputElement)

  return [labelElement, inputElement]
}


const appendInputFields = (inputFieldsConfigs, container, form) => {

  inputFieldsConfigs.forEach(inputFieldConfig => {

    const [labelElement, inputElement] = setUpInputField(inputFieldConfig, form)

    const brElement1 = document.createElement('br')
    const brElement2 = document.createElement('br')

    container.append(labelElement, inputElement, brElement1, brElement2)
  })
}


const appendNestedFieldSetsRecursively = (attribute, form) => {

  const inputFieldsConfigs          = attribute.inputFields
  const innerFieldSetConfigs        = attribute.fieldSet
  const appendingInputFieldsConfigs = attribute.appendingInputFields

  // Creating the fieldset, which will contain all coresponding inputs
  const fieldSetElement = document.createElement('fieldset')
  fieldSetElement.id = attribute.id

  // Creating the legend
  const legendElement = document.createElement('legend')
  legendElement.innerHTML = attribute.legend

  fieldSetElement.appendChild(legendElement)

  // Creating the input fields
  appendInputFields(inputFieldsConfigs, fieldSetElement, form)

  // Append nested fieldset if it exists
  if(innerFieldSetConfigs){
    const nestedFieldSet = appendNestedFieldSetsRecursively(innerFieldSetConfigs, form)
    fieldSetElement.appendChild(nestedFieldSet)
  }

  // Append leftover input fields if they exist
  if(appendingInputFieldsConfigs){

    appendInputFields(appendingInputFieldsConfigs, fieldSetElement, form)
  }

  return fieldSetElement
}


const formProjector = (formController, rootElement, form, attributes) => {

  // Set up form with a div inside it as a container around all fieldsets
  const formElement = document.createElement('form')
  formElement.innerHTML = `
    <div class=${className}></div>
  `

  // Get that div for later appendings
  const fieldSetsContainerElement = formElement.querySelector('.' + className)

  // Process through all the attributes
  attributes.forEach(attribute => {

    const submitConfigs   = attribute.submit
    const fieldSetConfigs = attribute.fieldSet

    if(fieldSetConfigs){
      const outmostFieldSet = appendNestedFieldSetsRecursively(fieldSetConfigs, form)
      fieldSetsContainerElement.appendChild(outmostFieldSet)
    }
    

    if(submitConfigs){
      const [labelElement, inputElement] = setUpInputField(submitConfigs, form)
      fieldSetsContainerElement.appendChild(inputElement)
    }    
  })

  rootElement.appendChild(formElement)
}