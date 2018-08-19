# Project List

Some projects of code during the process of study, they witnessed my growth.

## Preview

[Demo](http://www.chunqiuyiyu.com/project/)

## Usage

```shell
npm install
mkdir dist
cp list.json dist/list.json

npm install -g parcel
parcel index.html
```

If you want to add new project, just edit the file `list.json`. e.g.

```json
{
  "name": "New Project",
  "desc": "Some description",
  "url": "The link of project demo",
  "tags": []
}
```

## License

MIT