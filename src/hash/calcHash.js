import { createReadStream, promises as fsPromises } from "fs";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const fileName = "fileToCalculateHashFor.txt";
  const fileNamePath = path.join(__dirname, "files", fileName);

  try {
    await fsPromises.access(fileNamePath);

    const fileStream = createReadStream(fileNamePath);
    const hash = createHash("sha256");

    fileStream.pipe(hash);

    fileStream.on("close", () => {
      const hashResult = hash.digest("hex");
      console.log(`SHA256 hash for ${fileName}: ${hashResult}`);
    });
  } catch (error) {
    console.error(`Error calculating hash: ${error.message}`);
  }
};

await calculateHash();
