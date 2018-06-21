#!/usr/bin/env node
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const program = require('commander');
const utils = require('./lib');

// Init
program
  .description('Download lyric files of 163 musics with CLI.')
  .version('0.0.1')
  .usage('lrcer <cmd> [input]');

// Search music
program
  .command('search')
  .alias('s')
  .description('search music with name')
  .action(function(name) {
    utils.searchMusic(name);
  });

// Preview lrc
program
  .command('preview')
  .alias('p')
  .description('preview lyric of music')
  .action(function(id) {
    utils.preview(id);
  });

if (!process.argv[2]) {
  clear();
  console.log(
    chalk.green(figlet.textSync('lrcer', { horizontalLayout: 'full' }))
  );
  program.help();
}

program.parse(process.argv);
