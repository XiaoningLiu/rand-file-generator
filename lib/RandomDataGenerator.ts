import { Readable } from "stream";
import { getRandomBytes } from "./utils";

export default class RandomDataGenerator extends Readable {
  public readonly chunkSize: number;
  public readonly chunkNumber: number;

  private index = 0;
  private progress?: (index: number) => void;

  public constructor(
    chunkSize: number,
    chunkNumber: number,
    progress?: (index: number) => void
  ) {
    super();
    this.chunkSize = chunkSize;
    this.chunkNumber = chunkNumber;
    this.progress = progress;
  }

  // THIS IS A IMPLEMENTATION WITH A CONCURRENCY BUG
  public async _readWithBug(): Promise<void> {
    let buf;
    while (true) {
      if (this.index < this.chunkNumber) {
        // A potential concurrency issue in here
        // another _read() may be triggered during following internal async I/O operation
        buf = await getRandomBytes(this.chunkSize);
        this.index++;
        if (!this.push(buf)) {
          break;
        }
      } else {
        this.push(null);
        break;
      }
    }
  }

  public async _read(): Promise<void> {
    while (this.index < this.chunkNumber) {
      const buf = await getRandomBytes(this.chunkSize);

      // Check again because this.index maybe updated by another _read() call
      if (this.index < this.chunkNumber) {
        const result = this.push(buf);
        this.index++;
        if (this.progress) {
          this.progress(this.index * this.chunkSize);
        }
        if (!result) {
          return;
        }
      }
    }

    this.push(null); // End the stream by push null
  }
}
