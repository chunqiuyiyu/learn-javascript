const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const { fetch, logOK, logErr } = require('./fetch');

let globalID = 0;

const stringMap = (item, index) =>
  `${index + 1}--${item.name}--${item.ar[0].name}--${item.al.name}`;

const preview = (id) => {
  const url = 'https://api.imjad.cn/cloudmusic/?type=lyric&id=';
  fetch(url, id, data => {
    if (data.lrc) {
      const lrc = data.lrc.lyric;
      console.log(logOK(lrc));
      download(lrc);
    } else {
      logErr('There is no lyric for this music, please choose another!');
    }
  });
};

const download = (lrc) => inquirer.prompt([{
  type: 'list',
  name: 'isDownload',
  message: 'Would you like to download the lrc?',
  choices: ['OK', 'Cancel']
}]).then(answers => {
  if (answers.isDownload === 'OK') {
    console.log("Ready to download...");
    fs.writeFile('music.lrc', lrc,  function(err) {
       if (err) {
           return logErr(err);
       }
       logOK('Download file successfully！');
    });
  }
});

module.exports = {
  show: (songs) => inquirer.prompt([
    {
      type: 'list',
      name: 'song',
      message: 'Here are ' + songs.length + ' results, choose one to download',
      choices: songs.map((i, index) => stringMap(i, index))
    }
  ]).then(answers => {
    const arr = songs.filter((i, index) => stringMap(i, index) === answers.song);
    globalID = arr[0].id;
    preview(globalID);
  }),
  logErr,
  preview
};
