import AutoImport from 'unplugin-auto-import/vite'


export default function createAutoImport() {
  return AutoImport({
    imports: ['vue'],
    // resolvers: [ElementPlusResolver()],
    dts: './typings/auto-imports.d.ts',
  })
}
