export const docsRoot = 'src'

export const siteMetadata = {
  title: 'trry',
  base: '/trry-hub/',
  description: 'trry-blog',
} as const

export const customElements = ['iconify-icon'] as const

export function isCustomElement(tag: string) {
  return (customElements as readonly string[]).includes(tag)
}
