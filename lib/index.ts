import * as fs from "fs";
import * as path from "path";
import ProgressBar from "progress";
import mkdirp from "mkdirp";

import RandomDataGenerator from "./RandomDataGenerator";
import MD5Calculator from "./MD5Calculator";

// const destDirectory = "./";
// const destFileName = "1GB";
// const size = 1024 * 1024 * 1024; // 1GB
// const chunkSize = 512 * 1024; // 512KB by default chunk size to align with disk chunk
// const chunkNumber = size / chunkSize;

export default function generate(
  destDirectory: string,
  destFileName: string,
  chunkSize: number,
  chunkNumber: number
) {
  if (chunkSize <= 0 || chunkNumber <= 0) {
    throw new RangeError(`chunkSize and chunkNumber must larger than 0!`);
  }

  mkdirp.sync(destDirectory);
  const fullFilePath = path.join(destDirectory, destFileName);

  const bar = new ProgressBar("generating [:bar] :rate/bps :percent :etas", {
    complete: "=",
    incomplete: " ",
    width: 20,
    total: chunkSize * chunkNumber
  });

  const generator = new RandomDataGenerator(chunkSize, chunkNumber).on(
    "data",
    (data: Buffer) => {
      bar.tick(data.length);
    }
  );
  const calculator = new MD5Calculator(md5 => {
    console.log(`[Target File] ${fullFilePath}`);
    console.log(`[MD5]: ${md5}`);
  });
  const ws = fs.createWriteStream(fullFilePath, {
    autoClose: true
  });

  generator.pipe(calculator).pipe(ws);
}
