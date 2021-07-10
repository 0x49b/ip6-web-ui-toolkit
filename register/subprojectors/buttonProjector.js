export { registerButtonProjector }

/**
 * 
 * @param {register} register-model 
 * @returns 
 */
const registerButtonProjector = (register) => {
  
  const inputElement = document.createElement('input')
  inputElement.type = 'submit'
  inputElement.value = 'Register'
  inputElement.classList.add('primary')

  inputElement.onclick = (event) => {
    event.preventDefault()

    // TODO: API Call auf den Server
  }

  register.onFormValidityChanged(
    valid => valid
      ? inputElement.disabled = false
      : inputElement.disabled = true
  )

  return inputElement
}