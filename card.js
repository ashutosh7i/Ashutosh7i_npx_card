#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";
import openurl from "openurl";
import fs from "fs";
import request from "request";
import path from "path";
import ora from "ora";
import cliSpinners from "cli-spinners";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

clear();

//! importing User Data from data.json
const res = fs.readFileSync(path.resolve(__dirname, "data.json"));
const user_data = JSON.parse(res);
const {
  user_name,
  user_email,
  twitter_username,
  linkedin_username,
  github_username,
  personal_site,
  npx_card_handle,
  job_title,
  resume_url,
} = user_data;

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What you want to do🤔?",
    choices: [
      //// Send an email
      {
        name: `Send me an ${chalk.greenBright.bold("Email📧")}?`,
        value: () => {
          openurl.open(`https://ashutosh7i.dev/vcard`),
            console.log("\n Done, waiting at inbox📥.\n");
        },
      },
      //// Download Resume
      {
        name: `Download my ${chalk.yellowBright.bold("Resume📄")}?`,
        value: () => {
          // // cliSpinners.dots;
          // const loader = ora({
          //   text: " Downloading Resume ⌛",
          //   spinner: cliSpinners.material,
          // }).start();
          // let pipe = request(`${resume_url}`).pipe(
          //   fs.createWriteStream(`./${npx_card_handle}-resume.pdf`)
          // );
          // pipe.on("finish", function () {
          //   let downloadPath = path.join(
          //     process.cwd(),
          //     `${npx_card_handle}-resume.pdf`
          //   );
          //   console.log(`\nResume Downloaded at ${downloadPath} ✅\n`);
          //   open(downloadPath);
          //   loader.stop();
          // });
          openurl.open(`https://ashutosh7i.dev/resume`);
        },
      },
      //// Quit
      {
        name: "Just Exit.",
        value: () => {
          console.log("bye bye 👋 \n");
        },
      },
    ],
  },
];

const data = {
  name: chalk.hex("#FFE548").bold(`                  ${user_name}`),
  work: `${chalk.white(`${job_title}`)}`,
  github: chalk.gray("https://github.com/") + chalk.green(`${github_username}`),
  linkedin:
    chalk.gray("https://linkedin.com/in/") + chalk.blue(`${linkedin_username}`),
  twitter:
    chalk.gray("https://twitter.com/") + chalk.cyan(`${twitter_username}`),
  web: chalk.cyan(`${personal_site}`),
  npx: chalk.magenta("npx") + " " + chalk.white(`${npx_card_handle}`),

  labelWork: chalk.white.bold("       Work💼:"),
  labelTwitter: chalk.white.bold("    Twitter🐤:"),
  labelGitHub: chalk.white.bold("     GitHub🐱:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn📊:"),
  labelWeb: chalk.white.bold("        Web🌐:"),
  labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    ``,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic("I am currently Making full-stack projects,")}`,
    `${chalk.italic("my inbox is always open. Whether you have a")}`,
    `${chalk.italic("question or just want to say hi, I will try ")}`,
    `${chalk.italic("my best to get back to you!")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "green",
  }
);

console.log(me);

prompt(questions).then((answer) => answer.action());
