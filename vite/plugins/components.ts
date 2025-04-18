import Components from 'unplugin-vue-components/vite'

export default function createComponents() {
  return Components({
    dirs: ['./components/**'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: './typings/components.d.ts',
  })
}
