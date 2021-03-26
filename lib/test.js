const log = console.log
const beforeEachs = []
const afterEachs = []
const afterAlls = []
const beforeAlls = []
let Totaltests = 0
let passedTests = 0
let failedTests = 0
const stats = []
const currDesc = {
    it: []
}

const currIt = {}

const beforeEach = (fn) => {
    beforeEachs.push(fn)
}

const afterEach = (fn) => {
  afterEachs.push(fn)
}

const beforeAll = (fn) => {
    beforeAlls.push(fn)
}

const afterAll = (fn) => {
    afterAlls.push(fn)
}

const expect = (value) => {
    return {

        // Match or Asserts that expected and actual objects are same.
        toBe: (expected) => {
            if (value === expected) {
                currIt.expects.push({ name: `expect ${value} toBe ${expected}`, status: true })
                passedTests++
            } else {
                currIt.expects.push({ name: `expect ${value} toBe ${expected}`, status: false })
                failedTests++
            }
        },

        // Match the expected and actual result of the test.
        toEqual: (expected) => {
            if (value == expected) {
                currIt.expects.push({ name: `expect ${value} toEqual ${expected}`, status: true })
                passedTests++
            } else {
                currIt.expects.push({ name: `expect ${value} toEqual ${expected}`, status: false })
                failedTests++
            }
        }
    }
}

const it = (desc, fn) => {
    Totaltests++
    if (beforeEachs) {
        for (let index = 0; index < beforeEachs.length; index++) {
            beforeEachs[index].apply(this)
        }
    }
    //const f = stats[stats.length - 1]
    currIt = {
            name: desc,
            expects: []
        }
        //f.push(desc)
    fn.apply(this)
    for (let index = 0; index < afterEachs.length; index++) {
        afterEachs[index].apply(this)
    }
    currDesc.it.push(currIt)
}

const describe = (desc, fn) => {
    currDesc = {
        it: []
    }
    for (let index = 0; index < beforeAlls.length; index++) {
        beforeAlls[index].apply(this)
    }
    currDesc.name = desc
    fn.apply(this)
    for (let index = 0; index < afterAlls.length; index++) {
        afterAlls[index].apply(this)
    }
    stats.push(currDesc)
}

exports.showTestsResults = showTestsResults = () => {
    console.log(`Total Test: ${Totaltests}    
Test Suites: passed, total
Tests: ${passedTests} passed, ${Totaltests} total
`)
    log('Test Suites')
    for (let index = 0; index < stats.length; index++) {
        const e = stats[index];
        const descName = e.name
        const its = e.it
        log(descName)
        for (let i = 0; i < its.length; i++) {
            const _e = its[i];
            log(`   ${_e.name}`)
            for (let ii = 0; ii < _e.expects.length; ii++) {
                const expect = _e.expects[ii]
                log(`      ${expect.status === true ? '√' : 'X' } ${expect.name}`)
            }
        }
        log()
    }
}

global.describe = describe
global.it = it
global.expect = expect
global.afterEach = afterEach
global.beforeEach = beforeEach
global.beforeAll = beforeAll
global.afterAll = afterAll