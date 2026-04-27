import { resolve } from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcon(isBuild: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'public/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  })
}
