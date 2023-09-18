const fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();
const { spawn } = require('child_process');

const students = JSON.parse(fs.readFileSync("./students.json", "utf8"));
console.log("students", students);

git.clone("https://github.com/giorgio-tran/ics314-TA").then(() => {
  spawn("mv", ["ics314-TA", "./repos/"]);
});