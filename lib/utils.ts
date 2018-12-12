import { randomBytes } from "crypto";

export async function getRandomBytes(size: number): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    randomBytes(size, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
}
