const list = require('./list');
const { fetch } = require('./fetch');

module.exports = {
  searchMusic: (name) => {
    const url = 'https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=';
    fetch(url, name, data => {
      list.show(data.result.songs);
    });
  },

  preview: list.preview
};
