#!/usr/bin/env node

"use strict";

const installScripts = require("./");
const target = process.argv[2] || "node_modules";
(async () => {
  const result = await installScripts(target);
  Object.values(result).forEach(({ paths, scripts, name}) => {
    console.log(name);
    if (Object.keys(scripts).length > 0) {
      console.log("  scripts:");
    }
    Object.keys(scripts).forEach(type => {
      console.log(`    ${type}: ${scripts[type]}`);
    })
    if (paths.length > 0) {
      console.log("  paths:");
    }
    paths.forEach(path => {
      console.log(`    ${path}`);
    })
  });
})()
