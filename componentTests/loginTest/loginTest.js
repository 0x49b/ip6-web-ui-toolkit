import { Suite } from '../../test/test.js'
import kolibri from '../../script.js'

const LoginSuite = Suite('LoginSuite')

LoginSuite.add("is Title equal Login", assert => {

  const loginContainer = document.querySelector('.login')

  kolibri.login(loginContainer)

  const loginTitle = document.querySelector('h2')

  assert.is(loginTitle.innerHTML, "Login")
})

LoginSuite.run()