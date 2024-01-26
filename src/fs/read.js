import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const fileToReadPath = path.join(__dirname, "files", "fileToRead.txt");

  try {
    await fs.access(fileToReadPath);

    const fileContent = await fs.readFile(fileToReadPath, "utf-8");
    console.log('Content of "fileToRead.txt":\n', fileContent);
  } catch {
    throw new Error("FS operation failed");
  }
};

await read();
