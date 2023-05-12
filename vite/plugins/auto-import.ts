import AutoImport from 'unplugin-auto-import/vite'


export default function createAutoImport() {
  return [
    AutoImport({
      // dts: 'types/auto-imports.d.ts',
      dirs: [
        '/.vitepress/utils/composables/**',
      ],
    })]
}
