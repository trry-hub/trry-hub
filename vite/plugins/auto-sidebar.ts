import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'

export default function createAutoSidebar() {
  // add plugin
  return AutoSidebar({
    path: 'src/'
  })
}
