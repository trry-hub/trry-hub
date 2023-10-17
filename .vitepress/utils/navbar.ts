import fs from 'fs'
import path from 'path'

let navBar:any[] = []

/**
 * 根据 /zh 目录下的文件夹生成导航栏
 * link 只匹配文件夹下第一个md文件，如果没有md文件，则递归到有md文件为止
 */
function generateNavBarItemSync(dir: string, docsDir: string, navBar: any[]) {
  const res = fs.readdirSync(path.join(docsDir, dir))
  for (const item of res) {
    const fullPath = path.join(dir, item).replace('.md', '')

    if (isFileSync(path.join(docsDir, dir, item))) {
      navBar.push({
        text: item.replace('.md', ''),
        activeMatch: `^/${fullPath}/`,
        link: fullPath,
      })
    }
    if (!isFileSync(path.join(docsDir, dir, item))) {
      const obj = {
        text: item,
        activeMatch: `^/${fullPath}/`,
        link: formatPath(fullPath),
        // items: [],
      }
      navBar.push(obj)
      // generateNavBarItemSync(path.join(dir, item), docsDir, obj.items)
    }
  }
}
// 递归到第一个md文件组成路径
function formatPath(dir: string): string| undefined {
  const res = fs.readdirSync(path.join(docsDir, dir))
  for (const item of res) {
    if (isFileSync(path.join(docsDir, dir, item))) {
      return path.join(dir, item).replace('.md', '')
    }
    if (!isFileSync(path.join(docsDir, dir, item))) {
      return formatPath(path.join(dir, item))
    }
  }
}

function isFileSync(filePath: string) {
  try {
    const stats = fs.statSync(filePath)
    return stats.isFile()
  } catch (err) {
    console.error(err)
    return false
  }
}

// 获取当前项目根路径
const docsDir = path.resolve(__dirname, '../../')
generateNavBarItemSync('src', docsDir, navBar)

export default navBar

// export default [
//   { text: '首页', link: '/' },
//   { text: '指南', link: '/guide/' },
//   { text: '组件', link: '/components/' },
//   { text: '工具', link: '/tools/' },
//   { text: '资源', link: '/resources/' },
//   { text: 'GitHub', link: '' },
// ]
