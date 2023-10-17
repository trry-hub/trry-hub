import AutoImport from 'unplugin-auto-import/vite'


export default function createAutoImport() {
  return AutoImport({
      imports: ['vue'],
      dts: 'typings/auto-imports.d.ts',
      dirs: [
        '/.vitepress/utils/composables/**',
      ],
    })
}
