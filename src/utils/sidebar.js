import fs from 'fs/promises'
import path from 'path'

/**
 * 判断当前路径是文件还是文件夹
 */
async function isFileOrFolder(dir, name) {
  const stats = await fs.stat(path.join(dir, name))
  return stats.isFile()
}

/**
 * 读取文件夹下的文件,返回一个数组,数组中的每一项是一个对象,对象中包含文件名和文件路径,用于 vitepress 的navbar,只读第一层
 * 如果第一层目录下没有文件，则递归到有文件为止，组成link
 */
async function generateNavbarItem(dir, docsDir) {
  const navbarItem = []
  const res = await fs.readdir(path.join(docsDir, dir))
  for (const item of res) {
    if (await isFileOrFolder(path.join(docsDir, dir), item)) {
      navbarItem.push({
        text: item.replace('.md', ''),
        link: path.join(dir, item).replace('.md', '')
      })
    } else {
      const obj = {
        text: item,
        items: await generateNavbarItem(path.join(dir, item), docsDir)
      }
      navbarItem.push(obj)
    }
  }
  return navbarItem
}

const docsDir = path.resolve(__dirname)
export default generateNavbarItem('/zh', docsDir)
