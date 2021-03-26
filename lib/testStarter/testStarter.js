
import fs from './../../fs'
import { showTestsResults } from './../'

/** 
 * search for test folder 
 */
const searchTestFolder = () => {
    if (!fs.existsSync('test/')) {
        return false
    }
    return true
}

/**
 * get all test files in the test/ folder
 */
const getTestFiles = () => {
    let f = null
    if (f = fs.readdirSync('test/')) {
        return f.length == 0 ? null : f
    }
}

/**
 * run the test files
 * @param {*} f 
 */
const runTestFiles = (f = []) => {
    f.forEach((g) => {
        require(fs.realpathSync(`test/${g}`))
    })
    showTestsResults()
}

const run = () => {
    if (searchTestFolder()) {
        let files;
        if (files = getTestFiles()) {
            runTestFiles(files)
        } else {
            console.error('No test files found.')
        }
    } else {
        console.error(`'test/' folder doesn't exist`)
    }
}

run()