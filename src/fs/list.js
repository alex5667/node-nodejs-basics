import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesFolderPath = path.join(__dirname, "files");

const list = async () => {
  try {
    await fs.access(filesFolderPath);

    const fileNames = await fs.readdir(filesFolderPath);
    console.log('Files in the "files" folder:', fileNames);
  } catch {
    throw new Error("FS operation failed: Files folder not found");
  }
};

await list();
