const parseArgs = () => {
  const args = process.argv.slice(2);
  if (args.length % 2 !== 0) {
    console.error(
      "Invalid number of arguments. Each property must have a corresponding value."
    );
    return;
  }

  const parsedArgs = {};

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace("--", "");
    const propValue = args[i + 1];
    parsedArgs[propName] = propValue;
  }

  for (const propName in parsedArgs) {
    console.log(`${propName} is ${parsedArgs[propName]},`);
  }
};

parseArgs();