## Description

A tool for quickly generating random binary files

## Install

```bash
npm install -g random-file-generator
```

## Example

Generate a 200MB random binary file named "200MB" in "D:\temp" folder. 

```bash
$ rand-gen -d D:\temp -f 200MB -s 1024000 -n 200
Usage: rand-gen -d [num] -f [num] -s [num] -n [num]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  -d         Output directory. Create if it doesn't exist             [required]
  -f         Output file name                                         [required]
  -s         Size of every chunk in bytes                             [required]
  -n         How many chunks in file                                  [required]

generating [====================] 135360212/bps 100% 0.0s
[Target File] D:temp\200MB
[MD5]: ukVfpRVN1MSyNh8bxgdNYA==
```