import { createWriteStream, promises as fsPromises } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const fileName = "fileToWrite.txt";
  const filePath = path.join(__dirname, "files", fileName);

  try {
    await fsPromises.mkdir(path.dirname(filePath), { recursive: true });

    const fileStream = createWriteStream(filePath);

    process.stdin.pipe(fileStream);

    fileStream.on("finish", () => {
      console.log(`Data written to ${fileName} successfully.`);
    });

    fileStream.on("error", (err) => {
      console.error(`Error writing to file: ${err.message}`);
    });
  } catch (error) {
    console.error(
      `Error creating directory or accessing file: ${error.message}`
    );
  }
};

await write();
