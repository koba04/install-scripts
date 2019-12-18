# install-scripts
[![](https://github.com/koba04/install-scripts/workflows/test/badge.svg)](https://github.com/koba04/install-scripts/actions?workflow=test)


This package is to disclose scripts running on `npm install`.

```
npm install --save-dev install-scripts
```

## CLI

```sh
% npx install-scripts
fsevents
  scripts:
    install: node install
  paths:
    node_modules/fsevents/package.json
puppeteer
  scripts:
    install: node install.js
  paths:
    node_modules/puppeteer/package.json
styled-components
  scripts:
    postinstall: node ./scripts/postinstall.js || exit 0
  paths:
    node_modules/styled-components/package.json

// or
% npx install-scripts path/to/project/node_modules
```

## Node API

```js
const installScripts = require("install-scripts");
(async () => {
  const result = await installScripts(target);
  Object.values(result).forEach(({ paths, scripts, name}) => {
    console.log(name, scripts, paths);
  });
})();
```