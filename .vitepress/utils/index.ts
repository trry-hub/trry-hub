// 文件排序
function sortFileNames(files: string[]) {
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  })
  files.sort(collator.compare)
  return files
}

/**
 * 中划线转小驼峰
 * 调用时机：命名转换
 * @param {string} str
 * @returns str
 */
function camelize(str: string) {
  return (str + '').replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase()
  })
}

/**
 * 小驼峰转中划线
 * 调用时机：命名转换
 * @param {string} str
 * @returns str
 */
function hyphenate(str: string) {
  return (str + '').replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase()
  })
}

export { sortFileNames, hyphenate, camelize }
