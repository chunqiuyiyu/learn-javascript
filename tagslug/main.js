const fs = require('fs')

// tags = [x for x in os.listdir(path) if os.path.isdir(os.path.join(path,x))]
// tmp = '  {}: {}\n'

// # print(tags)
// with open('./tagslug.yaml', 'w') as f:
//   f.write('tag_map:\n')
//   for tag in tags:
//     f.write(tmp.format(tag, tag.lower()))


// Set blog path here
const path = '../../my-blogs/public/tags';

function scanDir(path) {
  try {
    return fs.readdirSync(path).map(file => file)
  } catch (e) {
    console.error(e);
  }
}

const files = scanDir(path);
const data = 'tag_map:\n' + files.map(name => `  ${name}: ${name.toLowerCase()}\n`).join('');

fs.writeFile('tagslug.yaml', data, (err) => {
  if (err) throw err;
  console.log('文件已保存！');
});