/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const joinPath = require("node:path").join;
const resolvePath = require("node:path").resolve;
const readFile = require("node:fs").readFileSync;

const configOverrides = {
    extends: "./.mocharc.json",
    reporter: "mochawesome",
    reporterOptions: [
        "autoOpen=true",
        "consoleReporter=none",
        "json=false",
        `reportDir=${resolvePath(joinPath(".", "build", "test-report"))}`,
        "reportFilename=index",
        "reportPageTitle=Cliofo test report",
        "reportTitle=SnapLib Cliofo Test Report"
    ]
};

const rootMocharcPath = resolvePath(joinPath(".", ".mocharc.json"));
const rootMocharcFileString = readFile(rootMocharcPath).toString();
const rootMocharcConfig = JSON.parse(rootMocharcFileString);

module.exports = {...rootMocharcConfig, ...configOverrides};
