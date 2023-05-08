import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
console.log(createSvgIconsPlugin)

export default function createSvgIcon(isBuild: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/assets/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  })
}
