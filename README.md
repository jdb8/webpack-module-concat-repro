# Quick repro steps:

* Clone this repo
* `yarn install` / `npm install` to install both the main package and the locally-provided base webpack config
* `yarn test` / `npm test` to reproduce the error (fails currently with the pinned requirements - specifically `webpack@3.4.1`)

# Additional notes

* Extending from a local base config (e.g. `const baseConfig = require('./my.cool.base.config.js')`) works fine
* Uncommenting the plugin line in the main webpack config works fine
* `yarn test` is grepping for the expected concatenated modules - you can also inspect the output `build/js/output.js` bundle manually to verify this

# Thoughts
* This seems like an issue with the fact that the webpack binary being called is different from the one being used when the base config `require`s it
