# install-scripts

This package is to disclose scripts running on `npm install`.

```
npm install --save-dev install-scripts
```

## CLI

```sh
npx install-scripts
// or
npx install-scripts path/to/project/node_modules
```

## Node API

```js
const installScripts = require("install-scripts");
(async () => {
  const result = await installScripts(target);
  Object.values(result).forEach(({ paths, scripts, name}) => {
    console.log(name, scripts);
  });
})();
```