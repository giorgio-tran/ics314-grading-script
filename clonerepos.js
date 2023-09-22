const fs = require("fs");
const { execSync } = require("child_process");

const students = JSON.parse(fs.readFileSync("./students.json", "utf8"));
const assignmentRepoName = process.argv[2];
const studentsWithoutRepos = [];

async function getRepos() {
  if (!fs.existsSync("./repos")) {
    fs.mkdirSync("./repos");
  }

  for (let student of students) {
    const url = `https://github.com/${student.github}/${assignmentRepoName}`;
    try {
      execSync(`git clone ${url} "./repos/${student.name}"`);

      if (fs.existsSync(`./repos/${student.name}/package.json`)) {
        execSync(`cd "./repos/${student.name}" && npm install && cd ..`);
      }
    } catch (err) {
      // console.log("error", err);
      console.log("No repository found for", student.name);
      studentsWithoutRepos.push(student.name);
    }
  };

  console.log("\n\nDid not find repos of following students:");
  for (let student of studentsWithoutRepos) {
    console.log(student);
  }
}

function run() {
  if (process.argv.length === 3) {
    getRepos();
  } else {
    console.log("Please enter the name of the assignment's repo (i.e sumofnumbers)\n");
  }
}

run();