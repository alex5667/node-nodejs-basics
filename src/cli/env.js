const parseEnv = () => {
  const envStrings = [];

  for (const key in process.env) {
    if (key.startsWith("RSS_")) {
      envStrings.push(`${key}=${process.env[key]}`);
    }
  }

  console.log(envStrings.join('; '));
};

parseEnv();
