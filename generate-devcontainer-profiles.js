const fs = require("fs");
const path = require("path");

const projectsFile = path.join(__dirname, "projects.json");
const devcontainerFile = path.join(
  __dirname,
  ".devcontainer",
  "devcontainer.json",
);

function generateProfiles(projects) {
  const profiles = {};
  projects.forEach((project) => {
    const name = project.name;
    profiles[name] = {
      remoteEnv: {
        PLAYWRIGHT_PROJECT: name,
      },
      runArgs: ["--env", `PLAYWRIGHT_PROJECT=${name}`],
    };
  });
  return profiles;
}

function main() {
  if (!fs.existsSync(projectsFile)) {
    console.error(`Could not find projects.json at ${projectsFile}`);
    process.exit(1);
  }

  if (!fs.existsSync(devcontainerFile)) {
    console.error(`Could not find devcontainer.json at ${devcontainerFile}`);
    process.exit(1);
  }

  const projectsData = fs.readFileSync(projectsFile, "utf-8");
  const devcontainerData = fs.readFileSync(devcontainerFile, "utf-8");

  let projects;
  try {
    projects = JSON.parse(projectsData);
  } catch (err) {
    console.error("Error parsing projects.json:", err);
    process.exit(1);
  }

  let devcontainerJson;
  try {
    devcontainerJson = JSON.parse(devcontainerData);
  } catch (err) {
    console.error("Error parsing devcontainer.json:", err);
    process.exit(1);
  }

  // Generate profiles from projects
  const profiles = generateProfiles(projects);

  // Replace or add the profiles section
  devcontainerJson.profiles = profiles;

  // Write back updated devcontainer.json
  fs.writeFileSync(
    devcontainerFile,
    JSON.stringify(devcontainerJson, null, 2),
    "utf-8",
  );
  console.log(`Updated profiles section in ${devcontainerFile}`);
}

main();
