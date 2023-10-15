"use strict";

const resolvePath = require("node:path").resolve;

const defaultMochaConfig = {
    "check-leaks": true,
    "node-option": [
        "loader=ts-node/esm"
    ],
    package: "./package.json",
    recursive: true,
    require: "ts-node/register",
    spec: "./src/test/ts/**/*.test.mts",
    ui: "tdd"
};

const mochawesomeConfig = {
    reporter: "mochawesome",
    reporterOptions: [
        "autoOpen=true",
        "consoleReporter=none",
        "json=false",
        "reportDir=./build/test-report",
        "reportFilename=index",
        "reportPageTitle=Cliofo test report",
        "reportTitle=SnapLib Cliofo Test Report"
    ]
};

module.exports = process.env.MOCHA_REPORTER === "mochawesome"
    ? {...defaultMochaConfig, ...mochawesomeConfig} : defaultMochaConfig;
