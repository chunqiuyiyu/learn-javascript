#!/usr/bin/env node
const https = require('https');
const fs = require('fs');

const API_URL = 'https://github-trending-api.now.sh/repositories';

https
  .get(API_URL, res => {
    let data = '';
    let str = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      const datas = JSON.parse(data);
      datas.map(item => {
        const { name, url, description, author } = item;
        str += `## [${author}/${name}](${url})\n${description}\n\n`;
      });

      fs.writeFileSync('trending.md', str);
      console.log('Success');
    });
  })
  .on('error', e => {
    console.error(e);
  });
