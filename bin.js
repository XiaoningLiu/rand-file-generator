#!/usr/bin/env node
const generate = require("./dist");
const argv = require("yargs")
  .usage("Usage: rand-gen -d [num] -f [num] -s [num] -n [num]")
  .describe("d", "Output directory. Create if it doesn't exist")
  .describe("f", "Output file name")
  .describe("s", "Size of every chunk in bytes")
  .describe("n", "How many chunks in file")
  .demandOption(["d", "f", "s", "n"]).argv;

generate.default(argv.d, argv.f, argv.s, argv.n);
