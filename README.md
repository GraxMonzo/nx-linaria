# nx-linaria

<p float="left" align="center" >
  <img alt="NX" src="docs/nx-logo.png" height="100">
  <img alt="Linaria" src="docs/linaria-logo.png" height="100">
</p>

[![npm version](https://img.shields.io/npm/v/nx-linaria?style=flat-square)](https://www.npmjs.com/package/nx-linaria)

> A [Nx](https://nx.dev/) Webpack plugin for enabling [Linaria](https://github.com/callstack/linaria) loader for babel projects.

# Installation

Add the plugin to your workspace:

```
npm i -D nx-linaria @linaria/core @linaria/react @linaria/babel-preset
```

_Compose the plugin in Webpack config:_

```js
//@ts-check

const { composePlugins, withNx } = require("@nrwl/webpack");
const { withReact } = require("@nrwl/react");
const { withLinaria } = require("nx-linaria");

module.exports = composePlugins(
  withNx(),
  withReact(),
  withLinaria(),
  (config) => {
    return config;
  }
);
```

_Include Linaria's babel preset in `.babelrc`:_

```json
{
  "presets": [
    [
      "@nrwl/react/babel",
      {
        "runtime": "automatic"
      }
    ],
    "@linaria"
  ],
  "plugins": []
}
```
