"use strict";

const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// ok: node_modules/bar/package.json
// ok: node_modules/@foo/bar/package.json
// no: node_modules/foo/bar/package.json

const isPackageJson = target => {
  const names = target.split(path.sep);
  names.reverse();
  const [name, parent, grandParent, greatGrandParent] = names;

  if (name !== "package.json") {
    return false;
  }

  if (grandParent === "node_modules" && parent[0] !== "@") {
    return true;
  }
  return grandParent[0] === "@" && greatGrandParent === "node_modules";
};

const readAllPackageJson = async (parent, packageJsonFiles) => {
  const files = await readdir(parent);
  for (const file of files) {
    const filePath = path.join(parent, file);
    if (isPackageJson(filePath)) {
      packageJsonFiles.push(filePath);
    }
    if ((await stat(filePath)).isDirectory()) {
      await readAllPackageJson(filePath, packageJsonFiles);
    }
  }
  return packageJsonFiles;
};

module.exports = async target => {
  const fileMap = {};
  const packageJsonFiles = await readAllPackageJson(target, []);
  packageJsonFiles.forEach(packageJson => {
    const json = require(path.resolve(packageJson));
    const packageName = json.name;
    if (json.scripts) {
      ['install', 'postinstall'].forEach(script => {
        if (json.scripts[script]) {
          let result = fileMap[packageName] || {
            name: packageName,
            paths: [],
            scripts: {}
          };
          result = {...result,
            paths: result.paths.includes(packageJson) ? result.paths : result.paths.concat(packageJson),
            scripts: {...result.scripts, [script]: json.scripts[script]}
          }
          fileMap[packageName] = result;
        }
      });
    }
  });
  return fileMap;
};
