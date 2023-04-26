import fs from 'fs'
import path from 'path'

/**
 * 读取文件夹下的文件,返回一个数组,数组中的每一项是一个对象,对象中包含文件名和文件路径,用于 vitepress 的navbar,只读第一层
 */
function readFiles(dir) {
    const files = fs.readdirSync(dir)
    const res = []
    files.forEach((item) => {
        // 判断如果是文件夹,则link 最后加上 /
        if (fs.statSync(`${dir}/${item}`).isDirectory()) {
            res.push({
                text: item,
                activeMatch: `^/${item}/`,
                link: `/${item}/`
            })
        }
        // 判断如果是文件,则link 最后不加 /
        if (fs.statSync(`${dir}/${item}`).isFile()) {
            res.push({
                text: item.replace('.md', ''),
                activeMatch: `^/${item}/`,
                link: `/${item}`.replace('.md', '')
            })
        }
    })
    return res
}

console.log(path.resolve() + '/zh')
export default readFiles(path.resolve() + '/zh')
