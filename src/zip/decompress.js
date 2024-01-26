import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGunzip } from "zlib";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const sourceFilePath = path.join(__dirname, "files", "archive.gz");
  const destinationFilePath = path.join(
    __dirname,
    "files",
    "fileToCompress.txt"
  );

  try {
    await pipeline(
      createReadStream(sourceFilePath),
      createGunzip(),
      createWriteStream(destinationFilePath)
    );
    console.log("File decompressed successfully.");
  } catch (error) {
    console.error(`Error during decompression: ${error.message}`);
  }
};

await decompress();
