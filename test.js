const assert = require('assert');

const installScripts = require("./");

(async () => {
  const result = await installScripts('./fixtures/node_modules');
  assert.deepStrictEqual(
    result,
    {
      "bar": {
        name: "bar",
        scripts: {
          preinstall: "node bar-preinstall",
          install: "node bar-install",
          postinstall: "node bar-postinstall"
        },
        paths: [
          "fixtures/node_modules/bar/package.json"
        ]
      },
      "@foo/bar": {
        name: "@foo/bar",
        scripts: {
          install: "node @foo/bar-install"
        },
        paths: [
          "fixtures/node_modules/@foo/bar/package.json"
        ]
      }
    }
  );
})();
