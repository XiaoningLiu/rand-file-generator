import { Transform, TransformOptions, TransformCallback } from "stream";
import { createHash, Hash } from "crypto";

export default class MD5Calculator extends Transform {
  private notifier: (md5: string) => any;
  private hash: Hash;

  public constructor(
    notifier: (md5: string) => any,
    options?: TransformOptions
  ) {
    super(options);
    this.notifier = notifier;
    this.hash = createHash("md5");
  }

  public _transform(chunk: any, encoding: string, callback: TransformCallback) {
    this.push(chunk);
    this.hash.update(chunk);
    callback();
  }

  public _flush(callback: TransformCallback) {
    this.notifier(this.hash.digest("base64"));
    callback();
  }
}
