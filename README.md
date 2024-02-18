# metalsmith-if

A metalsmith plugin for adding conditional steps to your build process.

This is very useful when paired with metalsmith-watch and metalsmith-serve for
skipping those plugins based on command-line flags or when in a
non-interactive environment, for instance.

## Installation

```bash
npm install metalsmith-if --save
```

## Usage

When using Metalsmith as a library, just pass the plugin to `Metalsmith#use`:

```js
const msIf = require('metalsmith-if');
const Metalsmith = require('metalsmith');

Metalsmith(__dirname)
  .use(msIf(true, plugin())) // this plugin will run
  .use(msIf(false, plugin())) // this plugin will not
```

The conditional can be any truthy or falsy statement; the plugin will run as
if it had been called directly inside the use().

One 'gotcha': when using `metalsmith-watch` or other plugins that perform some
immediate action upon instantiating (i.e. the `livereload` functionality),
you may need to use the same conditional inside the options object to disable
that. For example:

```js
const msIf = require('metalsmith-if');
const Metalsmith = require('metalsmith');

opts.watch = false;

Metalsmith(__dirname)
  .use(msIf(
    opts.watch,
    watch({
      livereload: opts.watch
    })
  ))
```

When using Metalsmith's CLI/`metalsmith.json` configuration, metalsmith-if is configured using an array of options.

The first item in the array is whether or not to run the plugin.
The second item is the plugin's name, same as if it had been used in the json file directly.
All subsequent array members will be passed to the plugin as arguments.

Plugins referenced this way must be included in the project's package.json file and be resolvable at runtime.

```json
{
  "plugins": [
    // ...
    {"deltamualpha/metalsmith-if": [true, "plugin/name", {"opt1": "1", "opt2": 2}]} // continue options as needed
    // this is equalivent to a plugin included as:
    {"plugin/name": {"opt1": "1", "opt2": 2}} 
    // ...
  ]
}
```

## License

MIT
