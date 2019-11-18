var chalk = require('chalk')

export let blue = (logString) => {
    console.log(chalk.blue(logString))
}

export let red = (logString) => {
    console.log(chalk.red(logString))
}

export let green = (logString) => {
    console.log(chalk.green(logString))
}

export let magenta = (logString) => {
    console.log(chalk.magenta(logString))
}

export let orange = (logString) => {
    console.log(chalk.orange(logString))
}

export let yello = (logString) => {
    console.log(chalk.yellow(logString))
}

const util = require('util');
const debug = util.debuglog('performance');
const { performance, PerformanceObserver} = require('perf_hooks')

const obs = new PerformanceObserver((items) => {
    items.getEntries().forEach((item) => {
        red('\n' + item.name, + ' ' + item.duration)
    })
})

obs.observe({entryTypes: ['measure']})

export let perfStart = (startMarkString) => {
    performance.mark(startMarkString);
}

export let perfEnd = (endMarkString) => {
    performance.mark(endMarkString);
}

export let perfMeasure = (descritption, startMarkString,endMarkString) => {
    performance.measure(descritption, startMarkString, endMarkString);
}
