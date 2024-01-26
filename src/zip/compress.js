import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const sourceFilePath = path.join(__dirname, "files", "fileToCompress.txt");
  const destinationFilePath = path.join(__dirname, "files", "archive.gz");
  try {
    await pipeline(
      createReadStream(sourceFilePath),
      createGzip(),
      createWriteStream(destinationFilePath)
    );
    console.log("File compressed successfully.");
  } catch (error) {
    console.error(`Error during compression: ${error.message}`);
  }
};

await compress();
