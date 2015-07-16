# metalsmith-if

  A metalsmith plugin for adding conditional steps to your build process.

  This is very useful when paired with metalsmith-watch and metalsmith-serve for
  skipping those plugins based on command-line flags or when in a 
  non-interactive environment, for instance.

## Installation

    $ npm install metalsmith-if --save

## Usage

  Pass the plugin to `Metalsmith#use`:

```js
var msIf = require('metalsmith-if');

metalsmith
  .use(msIf(
    true,
    plugin() // this plugin will run
  ))
  .use(msIf(
    false,
    plugin() // this plugin will not
  ));
```

  The conditional can be any truthy or falsy statement; the plugin will run as
  if it had been called directly inside the use().

  One 'gotcha': when using `metalsmith-watch` or other plugins that perform some
  immediate action upon instantiating (i.e. the `livereload` functionality), 
  you may need to use the same conditional inside the options object to disable
  that. For example:

```js
opts.watch = false;

metalsmith
  .use(msIf(
    opts.watch,
    watch({
      livereload: opts.watch
    })
  ))
```

## License

  MIT
