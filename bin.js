#!/usr/bin/env node

"use strict";

const installScripts = require("./");
const target = process.argv[2] || "node_modules";
(async () => {
  const result = await installScripts(target);
  Object.values(result).forEach(({ paths, scripts, name}) => {
    console.log(name, scripts);
  });
})()
