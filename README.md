# @tinysource/sizer

Determine the compiled, minified, and compressed size of a single Typescript file.

This is the official size determination for the [TinySource](https://github.com/tinysource/index) project.

Files are compiled using the [Typescript](https://www.typescriptlang.org/) compiler, minified using [Terser](https://terser.org/), and compressed using the Node.js `zlib` built-in.

## Usage

```bash
npx @tinysource/sizer <filename>
```

The size in bytes will be printed to STDOUT.
