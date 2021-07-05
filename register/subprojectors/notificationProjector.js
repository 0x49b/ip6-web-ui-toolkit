export { registerNotificationProjector }


/**
 * 
 * @param {register} register-model 
 * @param {Object} onNotificationChange, getNotification 
 * @returns pElement
 */
const registerNotificationProjector = (register, { onNotificationChange, getNotification }) => {

  const pElement = document.createElement('p')

  onNotificationChange(
    () => pElement.innerHTML = getNotification()
  )

  return pElement
}