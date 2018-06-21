const chalk = require('chalk');
const https = require('https');
const CLI = require('clui'),
    Spinner = CLI.Spinner;

const logErr = (txt) => {
  console.log(chalk.red(txt));
};

const logOK = (txt) => {
  console.log(chalk.green(txt));
};

module.exports = {
  fetch: (url, param, callback) => {
    if (typeof param === 'object' || 
      (url.includes('lyric') && isNaN(+param))) {
        logErr(`Please enter the correct arguments!`);
        return;
    }

    param = param.toString();
    const countdown = new Spinner('Take some time, please wait patiently...');
    countdown.start();

    https.get(url + encodeURI(param), (req, res) => {
      const data = [];

      req.on('data', res => {
          data.push(res);
      });

      req.on('end', () => {
        countdown.stop();
        const body = JSON.parse(data.join(''));
        callback(body);
      });
    });
  },

  logErr,
  logOK
}