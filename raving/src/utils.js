export default {
  getList: (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", './list.json', true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const tmp = JSON.parse(xhr.responseText);
        callback(tmp.data);
      }
    }
  },

  guid: () => {
    function S4() {
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
}