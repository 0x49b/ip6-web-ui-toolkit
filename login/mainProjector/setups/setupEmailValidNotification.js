
export { setupEmailValidNotification }

const setupEmailValidNotification = (login, notificationElement, emailInputElement ) => {
  emailInputElement.addEventListener('change', () => {

    if(!login.getEmail()) return notificationElement.innerHTML = ''
  
    login.getEmailValidity() 
      ? notificationElement.innerHTML = ''
      : notificationElement.innerHTML = 'Malformed Email'
  })
}
