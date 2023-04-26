const fs = require('fs')
const path = require('path')
const rootDir = path.resolve()
import navbar from './navbar'
let docsDir = path.join(rootDir, `/zh`);

let sidebar = [];
// 判断当前路径是文件还是文件夹
function isFileOrFolder(path) {
    return fs.statSync(`${docsDir}/${path}`).isFile()
}

// function tidySidebar(arr, currentName, parentUrl = '') {
//     const res = fs.readdirSync(`${docsDir}${parentUrl}/${currentName}`)
//     res.forEach((item) => {
//         if (isFileOrFolder(`${parentUrl}/${currentName}/${item}`)) {
//             arr.push({
//                 text: item.replace('.md', ''),
//                 link: `${parentUrl}/${currentName}/${item}`.replace('.md', '')
//             })
//         } else {
//             let obj = {
//                 text: item,
//                 collapsed: `${parentUrl}/${currentName}/${item}`.split('/').length > 3,
//                 items: []
//             }
//             tidySidebar(obj.items, item, `${parentUrl}/${currentName}`)
//             arr.push(obj)
//         }
//     })
// }

// tidySidebar(sidebar, 'zh')
// export default sidebar;

// 根据 navbar link 生成 sidebar，sidebar 用于 vitepress 的侧边栏,siderbar 是一个对象
// 要递归查询所有子目录，所以要用到递归
function generateSidebar(navbar) {
    let sidebar = {}
    navbar.forEach((item) => {
        if (item.link) {
            sidebar[item.link] = generateSidebarItem(item.link)
        } else if (item.items) {
            item.items.forEach((subItem) => {
                sidebar[subItem.link] = generateSidebarItem(subItem.link)
            })
        }
    })
    return sidebar
}

// 请完成 generateSidebarItem 函数，它接受一个路径作为参数，返回一个数组，数组中的每一项是一个对象，对象中包含文件名和文件路径
function generateSidebarItem(link) {
    let sidebarItem = []
    let res = fs.readdirSync(`${docsDir}/${link}`)
    res.forEach((item) => {
        if (isFileOrFolder(`${link}/${item}`)) {
            sidebarItem.push({
                text: item.replace('.md', ''),
                link: `${link}/${item}`.replace('.md', '')
            })
        } else {
            let obj = {
                text: item,
                collapsed: `${link}/${item}`.split('/').length > 3,
                items: []
            }
            obj.items = generateSidebarItem(`${link}/${item}`)
            sidebarItem.push(obj)
        }
    })
    return sidebarItem
}

export default generateSidebar(navbar)
