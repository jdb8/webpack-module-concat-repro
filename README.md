# Summary

Initially, I thought this was a bug that occurred when extending the base config via an npm module. Turns out it's slightly less of a problem, but still happens when debugging locally and might be worth investigating a fix. I also have a suspicion that this might occur for cases outside of development, too (see the [Thoughts](#thoughts) section).

# Quick repro steps:

* Clone this repo and `cd` into it
* `yarn install` / `npm install` to install both the main package and the locally-provided base webpack config
* Verify that `yarn test` / `npm test` *succeeds*
* `cd base_configs && yarn install` to install the *base config's* dependencies. This is the crucial step that caused my initial bug, since I was `yarn link`ing/had run `yarn add file:../base_config` which copies everything - including the `node_modules` folder
* `yarn test` / `npm test` to reproduce the error (fails currently with the pinned requirements - specifically `webpack@3.4.1`)
* For additional sanity, you can try deleting `base_configs/node_modules` and running `yarn test` in the top-level dir again - it should pass

# Additional notes

* Extending from a local base config (e.g. `const baseConfig = require('./my.cool.base.config.js')`) works fine
* Uncommenting the plugin line in the main webpack config works fine
* `yarn test` is grepping for the expected concatenated modules - you can also inspect the output `build/js/output.js` bundle manually to verify this

# Thoughts
* Now that I've pinned this down to the existance of `node_modules` containing `webpack` in the dependency itself, it seems perhaps more clear that the mismatch of the plugin's location (the nested node_modules vs. the top-level node_modules) is what's causing something to go awry
* Is it possible this will also affect cases where versions of webpack are mismatched, causing this nested-node_modules structure to occur even outside of development? 🤔
