import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcon(isBuild: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'public/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  })
}
