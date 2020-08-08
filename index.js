#!/usr/bin/env node
const ts = require("typescript");
const terser = require("terser");
const zlib = require("zlib");

(async () => {
  const [, , filename] = process.argv;

  if (!filename) {
    console.log("Missing filename argument.");
    process.exit(1);
  } else if (!/\.tsx?$/i.test(filename)) {
    console.log("Filenames must have a .ts or .tsx extension.");
    process.exit(1);
  }

  const options = {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React,
  };
  const host = ts.createCompilerHost(options);
  const program = ts.createProgram([filename], options, host);

  let output = "";

  host.writeFile = (_filename, contents) => {
    output += contents;
  };
  program.emit();

  output = (await terser.minify(output)).code;
  output = await new Promise((resolve) =>
    zlib.gzip(Buffer.from(output, "utf-8"), (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  );

  console.log(`${output.length}`);
})().catch((err) => console.log(err));
