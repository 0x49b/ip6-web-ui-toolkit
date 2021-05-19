import { Suite } from './test/test.js'

const firstSuite = Suite('firstSuite')

firstSuite.add("something", assert => {
  assert.true(true)

  const loginTitle = document.querySelector('h2')
  console.log(document)
  assert.is(loginTitle.innerHTML, "Login")
})

firstSuite.run()