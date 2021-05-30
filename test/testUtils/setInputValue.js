import { fireEvent } from "./events.js"

// Sets the value of an inputfield and fires events which typically gets fired when a user would set them
export const setInputValue = ( emailInputField, emailValue ) => {
  emailInputField.value = emailValue

  fireEvent(emailInputField, 'keyup')
  fireEvent(emailInputField, 'change')
  fireEvent(emailInputField, 'focusout')
}