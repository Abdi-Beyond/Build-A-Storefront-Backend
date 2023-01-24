# Forked
I'm just forking from tsc-watch so I can have a version of this working on Macs

# The TypeScript compiler with `--watch` and a new onSuccess argument
`ts-watch` starts the `tsc` (TypeScript compiler) with `--watch` parameter, it also adds a new argument `--onSuccess COMMAND`. this `COMMAND` will be executed on every successful TypeScript compilation.

## Install

```sh
npm install ts-watch --save-dev
```

## Usage

```sh
ts-watch server.ts --outDir ./dist --onSuccess "node ./dist/server.ts"
```


Notes:
* The `COMMAND` will not run if the compilation failed.
* The child process (`COMMAND`) will be terminated before creating a new one.
* `ts-watch` is using the currently installed TypeScript compiler.
* `ts-watch` is not changing the compiler, just adds the new arguments, compilation is the same, and all other arguments are the same.
* `ts-watch` was created to allow an easy dev process with TypeScript. Commonly used to restart a node server.
