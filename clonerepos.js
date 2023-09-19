const fs = require("fs");
const simpleGit = require("simple-git");
const { execSync } = require("child_process");

const git = simpleGit();

const students = JSON.parse(fs.readFileSync("./students.json", "utf8"));
const assignmentRepoName = process.argv[2];

async function getRepos() {
  if (!fs.existsSync("./repos")) {
    fs.mkdirSync("./repos");
  }

  for (let student of students) {
    const url = `https://github.com/${student.github}/${assignmentRepoName}`;
    try {
      await git.clone(url);
      execSync(`mv ${assignmentRepoName} "${student.name}"`);
      execSync(`mv "${student.name}" ./repos`);
    } catch (err) {
      console.log("No repository found for", student.name);
    }
  };
}

function run() {
  if (process.argv.length === 3) {
    getRepos();
  } else {
    console.log("Please enter the name of the assignment's repo (i.e sumofnumbers)\n");
  }
}

run();