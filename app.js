#!/usr/bin/env node

"use strict";

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import open from "open";
import axios from "axios";
import fs from "fs";
import path from "path";

const data = {
  // Personal Data
  name: chalk.green("                                    Zacky Achmad"),
  work: `${chalk.white("Back-End Developer at")} ${chalk
    .hex("#005380")
    .bold("PT. Astra Graphia Information Technology")}`,
  x: chalk.gray("https://x.com/") + chalk.blue("zckyachmd"),
  github: chalk.gray("https://github.com/") + chalk.magenta("zckyachmd"),
  linkedin: chalk.gray("https://linkedin.com/in/") + chalk.cyan("zckyachmd"),
  web: chalk.hex("e8676b").bold("https://zacky.id"),

  // About
  about: [
    chalk.italic(
      "Adaptable PHP Developer transcending PHP boundaries, evolving with back-end tech."
    ),
    chalk.italic(
      "Seamlessly integrating emerging tech for forward-thinking web development."
    ),
    chalk.italic(
      "Commitment beyond languages, embracing holistic understanding."
    ),
    chalk.italic("Let's connect for exciting possibilities."),
  ],

  // Motto
  motto: chalk.yellow("At least, 1% better every day."),

  // Label
  labelWork: chalk.white.bold("       Work:"),
  labelX: chalk.white.bold("          X:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn:"),
  labelWeb: chalk.white.bold("        Web:"),
  labelMotto: chalk.white.bold("Motto:"),

  // CV
  cvName: "CV_Bagaskara-Achmad-Zaky.pdf",
  cvUrl: "https://zacky.id/CV_Bagaskara-Achmad-Zaky.pdf",
};

const currentDirectory = process.cwd();

const downloadCV = async () => {
  try {
    // Check if the file already exists
    const filePath = path.join(currentDirectory, data.cvName);
    if (fs.existsSync(filePath)) {
      return;
    }

    // Download the file
    const response = await axios.get(data.cvUrl, {
      responseType: "stream",
    });
    response.data.pipe(fs.createWriteStream(filePath));
  } catch (error) {
    console.error("Error downloading CV:", error);
  }
};

const askUser = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        {
          name: `Send an ${chalk.green.bold("email")}?`,
          value: () => {
            open("mailto:zckyachmd@gmail.com");
            console.log("\nDone, see you soon.\n");
          },
        },
        {
          name: `Download my ${chalk.magenta.bold("CV")}?`,
          value: () => {
            downloadCV().then(() => {
              open("file://" + path.join(currentDirectory, data.cvName));
              console.log("CV downloaded successfully!");
            });
          },
        },
        {
          name: "Just quit.",
          value: () => {
            console.log("Goodbye!\n");
          },
        },
      ],
    },
  ]);
};

const displayCard = () => {
  const card = boxen(
    [
      `${data.name}`,
      ``,
      `${data.labelWork}  ${data.work}`,
      ``,
      `${data.labelX}  ${data.x}`,
      `${data.labelGitHub}  ${data.github}`,
      `${data.labelLinkedIn}  ${data.linkedin}`,
      `${data.labelWeb}  ${data.web}`,
      ``,
      ...data.about,
      ``,
      `${data.labelMotto}  ${data.motto}`,
    ].join("\n"),
    {
      padding: 1,
      margin: 1,
      float: "center",
      borderStyle: "round",
      borderColor: "green",
    }
  );

  const tip =
    chalk.green.bold("Tip: ") + chalk.white("cmd/ctrl + click on the links");

  console.log(card);
  console.log(tip);

  // Ask the user
  askUser().then((answer) => answer.action());
};

displayCard();
