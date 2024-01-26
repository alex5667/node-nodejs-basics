import fs from "fs/promises";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const sourceFolder = path.join(__dirname, "files");
  const destinationFolder = path.join(__dirname, "files_copy");

  try {
    await fs.access(sourceFolder, fs.constants.R_OK);

    await fs.access(destinationFolder, fs.constants.R_OK);

    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      try {
        await fs.mkdir(destinationFolder);

        const files = await fs.readdir(sourceFolder);
        for (const file of files) {
          const sourceFilePath = path.join(sourceFolder, file);
          const destinationFilePath = path.join(destinationFolder, file);

          await fs.copyFile(sourceFilePath, destinationFilePath);
        }

        console.log("Files copied successfully.");
      } catch (copyErr) {
        console.error("Error copying files:", copyErr.message);
      }
    } else {
      console.error("Error:", err.message);
    }
  }
};

await copy();
