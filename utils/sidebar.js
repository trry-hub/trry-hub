const fs = require("fs");
const path = require("path");
const rootDir = path.resolve();
let docsDir = path.join(rootDir, ``);

let sidebar = [];
// 判断当前路径是文件还是文件夹
function isFileOrFolder(path) {
    return fs.statSync(`${docsDir}/${path}`).isFile()
}

function tidySidebar(arr, currentName, parentUrl = '') {
    const res = fs.readdirSync(`${docsDir}${parentUrl}/${currentName}`)
    res.forEach((item) => {
        if (isFileOrFolder(`${parentUrl}/${currentName}/${item}`)) {
            arr.push({
                text: item.replace('.md', ''),
                link: `${parentUrl}/${currentName}/${item}`.replace('.md', '')
            })
        } else {
            let obj = {
                text: item,
                collapsed: `${parentUrl}/${currentName}/${item}`.split('/').length > 3,
                items: []
            }
            tidySidebar(obj.items, item, `${parentUrl}/${currentName}`)
            arr.push(obj)
        }
    })
}

tidySidebar(sidebar, 'zh')
export default sidebar;
