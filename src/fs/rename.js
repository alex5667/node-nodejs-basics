import fs from "fs/promises";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const sourceFileName = "wrongFilename.txt";
  const targetFileName = "properFilename.md";

  const sourceFilePath = path.join(__dirname, "files", sourceFileName);
  const targetFilePath = path.join(__dirname, "files", targetFileName);

  try {
    await fs.access(sourceFilePath);

    try {
      await fs.access(targetFilePath);
      throw new Error("FS operation failed");
    } catch {
      await fs.rename(sourceFilePath, targetFilePath);
      console.log("File renamed successfully.");
    }
  } catch {
    throw new Error("FS operation failed");
  }
};

await rename();
