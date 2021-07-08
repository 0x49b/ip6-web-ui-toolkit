
export { setupLoginNotification }

const setupLoginNotification = (login, notificationElement) => {

  login.onLoginSuccessChanged( () => {

    if(login.getLoginSuccess()) {
      login.setNotification('Logged in successfully!')
      notificationElement.classList.add('success')
    } else if(login.getPassword()){ // Checking if pw has value, because the onLoginSuccessChanged gets called immediately, therefore setting notification even without any input.
      login.setNotification('Sorry we could not process your login attempt')
      notificationElement.classList.remove('success')
    } else {
      login.setNotification('')
      notificationElement.classList.remove('success')
    }
  })

  login.onNotificationChanged( () => notificationElement.innerHTML = login.getNotification())
}