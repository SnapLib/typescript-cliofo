/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const joinPath = require("node:path").join;
const resolvePath = require("node:path").resolve;

const configOverrides = {
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

const rootMocharcPath = resolvePath(joinPath(".", ".mocharc.cjs"));
const rootMocharcConfig = require(rootMocharcPath);

module.exports = {...rootMocharcConfig, ...configOverrides};
