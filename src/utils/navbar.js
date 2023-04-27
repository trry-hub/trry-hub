const fs = require('fs')
const path = require('path')

let navBar = []

/**
 * 根据 /zh 目录下的文件夹生成导航栏
 * link 需要找到文件夹下第一个md文件，如果没有md文件，则递归到有md文件为止
 */
function generateNavBarItemSync(dir, docsDir,navBar) {
    const res = fs.readdirSync(path.join(docsDir, dir))
    for (const item of res) {
        if (isFileSync(path.join(docsDir, dir, item))) {
            navBar.push({
                text: item.replace('.md', ''),
                link: path.join(dir, item).replace('.md', ''),
            })
        }
        if(!isFileSync(path.join(docsDir, dir, item))) {
            const obj = {
                text: item,
                activeMatch: `^/${docsDir}/`,
                items: [],
            }
            navBar.push(obj)
            generateNavBarItemSync(path.join(dir, item), docsDir,obj.items)
        }
    }
}

function isFileSync(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return stats.isFile()
  } catch (err) {
    console.error(err)
    return false
  }
}

// 获取当前项目根路径
const docsDir = path.resolve(__dirname, '../zh')
generateNavBarItemSync('', docsDir,navBar)

export default navBar

// export default [
//   { text: '首页', link: '/' },
//   { text: '指南', link: '/guide/' },
//   { text: '组件', link: '/components/' },
//   { text: '工具', link: '/tools/' },
//   { text: '资源', link: '/resources/' },
//   { text: 'GitHub', link: '' },
// ]
