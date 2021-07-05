export { loginService }

const loginService = () => {

  /**
   * 
   * @param {String} url 
   * @param {string} email 
   * @param {string} password 
   * @returns {Response} Returns http-response or promise rejection
   */
  const loginAttempt = (url, email, password) => {
    const request = {
      method: 'POST',
      Headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
  
    return fetch(url, request)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      })
      .catch(err => err)
  }

  return { 
    loginAttempt
  }
}
