import { createReadStream, promises as fsPromises } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const fileName = "fileToRead.txt";
  const filePath = path.join(__dirname, "files", fileName);

  try {
    await fsPromises.access(filePath);

    const fileStream = createReadStream(filePath);

    fileStream.pipe(process.stdout);

    fileStream.on("end", () => {
      console.log("\nFile reading completed.");
    });

    fileStream.on("error", (err) => {
      console.error(`Error reading file: ${err.message}`);
    });
  } catch (error) {
    console.error(`Error accessing file: ${error.message}`);
  }
};

await read();
