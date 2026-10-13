import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default {
  watch: ['./navigation.json'],
  load() {
    const release = JSON.parse(readFileSync(resolve('releases/navigation.json'), 'utf8'))
    return {
      ...release,
      available: existsSync(resolve('public', release.downloadPath.slice(1))),
      sizeMiB: (release.bytes / 1024 / 1024).toFixed(1),
    }
  },
}
