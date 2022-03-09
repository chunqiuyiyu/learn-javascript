const trimAll = (str) => str.replace(/[\n|\s]/g, "").trim();
const trim = (str) => str.replace(/\n/g, "").trim();

const fetch = require("node-fetch");
var cheerio = require("cheerio");

const main = async () => {
  const response = await fetch("https://github.com/trending");
  const html = await response.text();

  $ = cheerio.load(html);
  const data = [];
  $(".Box-row").each((item) => {
    const parent = $(".Box-row")[item];
    data.push({
      title: $(parent).find(".h3").text(),
      desc: $(parent).find(".col-9").text(),
      url: $(parent).find(".h3 a").attr("href"),
    });
  });

  let str = "";
  data.map((item, index) => {
    str += `## [${trimAll(item.title)}](https://github.com${item.url})\n${trim(
      item.desc
    )}\n\n`;
  });

  console.log(str);
};

main();
