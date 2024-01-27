import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = path.join(__dirname, "files", "script.js");

  const childProcess = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.on("data", (data) => {
    process.stdout.write(data);
  });

  childProcess.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(["someArgument1", "someArgument2"]);
