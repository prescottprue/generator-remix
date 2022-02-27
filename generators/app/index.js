"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stunning ${chalk.red("generator-remix")} generator!`
      )
    );

    const prompts = [
      // TODO: Add support in prisma, docker-compose, and fly
      // {
      //   type: "list",
      //   name: "databaseType",
      //   choices: [
      //     {
      //       name: "Postgres",
      //       value: "postgresql"
      //     }
      //   ],
      //   message: "Which type of database would you like",
      //   default: 0,
      //   store: true
      // },
      {
        type: "input",
        name: "githubUser",
        message: "Github Username",
        default: "testuser",
        store: true
      },
      {
        type: "confirm",
        name: "includeFly",
        message: "Include configuration to deploy to Fly.io",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.includeFly;
      this.props = props;
    });
  }

  writing() {
    const filesArray = [
      "app/**",
      "prisma/**",
      "public/**",
      "workflows/**",
      ".dockerignore",
      ".env",
      ".gitignore",
      "docker-compose.yml",
      "Dockerfile",
      "package.json",
      "README.md",
      "remix.config.js",
      "remix.env.d.ts",
      "start_with_migrations.sh",
      "tsconfig.json"
    ];
    if (this.props.includeFly) {
      filesArray.push("fly.toml");
    }

    const ignorePaths = [];
    filesArray.forEach(file => {
      if (file.noTemplating || file.src.includes(".png")) {
        return this.fs.copy(
          this.templatePath(file.src),
          this.destinationPath(file.dest || file.src || file),
          { globOptions: { ignore: ignorePaths } }
        );
      }

      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data,
        {}, // TemplateOptions    // not here
        { globOptions: { ignore: ignorePaths } } // < but here
      );
    });
  }

  install() {
    this.installDependencies();
  }
};
