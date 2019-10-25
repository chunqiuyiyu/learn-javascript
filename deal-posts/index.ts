import { promisify } from 'util'
import { readdir, readFile, writeFile, mkdir, existsSync } from 'fs'
import { join } from 'path'

import fm = require('front-matter')
import dayjs = require('dayjs')
import marked = require('marked')

const getDirData = promisify(readdir)
const getFileData = promisify(readFile)
const setFileData = promisify(writeFile)
const createDir = promisify(mkdir)

const postsPath = 'posts'
const articlesPath = 'articles'
const publicPath = 'public'

type Content = {
  attributes: {
    date: string
  }
  body: string,
  link?: string
}

const contents = []

const readSource = async (): Promise<void> => {
  const data = await getDirData(join(__dirname, `../${postsPath}`))

  // Split .md files to directories by it's date
  for (const fileName of data) {
    if (fileName.endsWith('.md')) {
      const fileData = await getFileData(join(postsPath, fileName), 'utf8')
      const content: Content = fm(fileData)

      const date = dayjs(content.attributes.date)
      const year = date.year().toString()

      let month: string | number = date.month()
      if (!month) {
        month++
      }

      if (month.toString().length === 1) {
        month = '0' + month.toString()
      }

      month = month.toString()

      const customPath = join(__dirname, `../${articlesPath}`, year, month)
      const htmlPath = join(__dirname, `../${publicPath}`, year, month)

      if (!existsSync(customPath)) {
        await createDir(customPath, { recursive: true })
      }

      await setFileData(join(customPath, fileName), fileData)
    }
  }
}

readSource()
