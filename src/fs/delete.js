import fs from "fs/promises";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  const fileToRemove = "fileToRemove.txt";
  const filePath = path.join(__dirname, "files", fileToRemove);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    console.log("File removed successfully.");
  } catch {
    throw new Error("FS operation failed");
  }
};

await remove();
