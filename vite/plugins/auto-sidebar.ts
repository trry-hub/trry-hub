import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'

export default function createAutoSidebar() {
  // add plugin
  return AutoSidebar({
    // You can also set options to adjust sidebar data
    // see option document below
  })
}
