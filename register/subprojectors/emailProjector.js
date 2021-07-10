export { registerEmailProjector }

/**
 * 
 * @param {register} register-model 
 * @param {string} label 
 * @returns inputElement and labelElement
 */
const registerEmailProjector = (register, label) => {

  const inputElement = document.createElement('input')
  inputElement.type = 'email'
  inputElement.placeholder = 'example@mail.com'
  inputElement.id   = label.toLowerCase()

  const labelElement = document.createElement('label')
  labelElement.htmlFor = label.toLowerCase()
  labelElement.innerHTML = label

  inputElement.oninput = () => register.setEmail(inputElement.value)

  register.onEmailChanged( () => inputElement.value = register.getEmail() )

  inputElement.addEventListener('change', () => {
    if(!register.getEmail()) return setValidityClass(inputElement, null)

    const valid = register.getEmailValidity()
    setValidityClass(inputElement, valid)
  })

  return [ inputElement, labelElement ]
}

const setValidityClass = (element, valid) => {

  if(null === valid) {
    element.classList.remove('valid')
    element.classList.remove('invalid')
    return
  }

  if(valid) {
    element.classList.add('valid')
    element.classList.remove('invalid')
  } else {
    element.classList.remove('valid')
    element.classList.add('invalid')
  }
}