import { getAllUniqueGroupNames, VALID, VALUE, LABEL, EDITABLE } from '../../presentationModel/presentationModel.js'

export { formProjector, pageCss }

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

let idCounter = 0
const nextId = () => idCounter++

const inputFieldProjector = (attributeConfig, attribute) => {

  const id = nextId()

  const labelElement   = document.createElement('label')
  labelElement.htmlFor = id

  const inputElement = document.createElement('input')
  inputElement.type  = attributeConfig.type
  inputElement.id    = id
  if(attributeConfig.name)        inputElement.name        = attributeConfig.name
  if(attributeConfig.placeholder) inputElement.placeholder = attributeConfig.placeholder

  attribute.getObs(LABEL).onChange(label => labelElement.textContent = label)

  bindInput(attribute, inputElement)

  return [labelElement, inputElement]
}

const fieldsetProjector = legendTitle => {

  const fieldsetElement   = document.createElement('fieldset')

  const legendElement     = document.createElement('legend')
  legendElement.innerHTML = legendTitle

  fieldsetElement.appendChild(legendElement)

  return fieldsetElement
}

const setupFieldsets = groupNames => {

  const fieldsets = {}

  groupNames.forEach(groupName => {
    
    const fieldsetElement = fieldsetProjector(groupName)
    if(groupName) fieldsetElement.classList.add('group')

    fieldsets[groupName] = fieldsetElement
  })

  return fieldsets
}

const setupDatalist = listId => {

  const datalistElement = document.createElement('datalist')
  datalistElement.id = listId

  const colors = ['Yellow', 'Red', 'Orange', 'Green']

  colors.forEach(clr => {
    const optionElement = document.createElement('option')
    optionElement.value = clr
    datalistElement.appendChild(optionElement)
  })

  return datalistElement
}


const formProjector = (formController, rootElement, form, attributeConfigs) => {

  // Set up form with a div inside it as a container around all fieldsets
  const formElement = document.createElement('form')
  formElement.innerHTML = `
    <div class=${className}></div>
  `

  // Get that div for later appendings
  const inputFiledsContainerElement = formElement.querySelector('.' + className)

  // Get all group names
  const groupNames = getAllUniqueGroupNames()

  const fieldsets = setupFieldsets(groupNames)

  // Process through all the attributes
  let submitElement // Used to make sure that the submit button always gets appended at the end of the form

  attributeConfigs.forEach(attributeConfig => {

    const attribute = form[attributeConfig.id]

    const inputContainerElement = document.createElement('div')
    inputContainerElement.classList.add('input-container')

    const [labelElement, inputElement] = inputFieldProjector(attributeConfig, attribute)

    if(attributeConfig.type === 'submit') {
      inputContainerElement.appendChild(inputElement)
    } else {
      inputContainerElement.append(labelElement, inputElement)
    }

    if(attributeConfig.id === 'favColor') {
      const listName = 'favouriteColor'
      inputElement.setAttribute('list', listName)
      const datalistElement = setupDatalist(listName)
      inputContainerElement.appendChild(datalistElement)
    }

    const groupName = attribute.getGroup()
    const fieldsetElement = fieldsets[groupName]

    if(attributeConfig.type === 'submit') submitElement = inputContainerElement

    fieldsetElement.append(inputContainerElement)
    inputFiledsContainerElement.appendChild(fieldsetElement)
  })

  inputFiledsContainerElement.appendChild(submitElement)

  rootElement.appendChild(formElement)
}

const pageCss = `
  h3 {
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  #formV2 {
    width: 650px;
    margin: 0 auto;
    font-family: sans-serif;
  }

  fieldset {
    border: none;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 0.5rem;
    grid-column-gap: 1rem;
  }

  fieldset.group {
    position: relative;
    border: none;
    background: #e0e0e0;
    margin-top: 2.1rem;
  }

  legend {
    position: absolute;
    bottom: 100%;
    left: 0px;
  }

  .input-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }

  input {
    width: 200px;
    height: 21px;
  }

  input[type="submit"] {
    margin-top: 1.5rem;
    width: 180px;
  }
`