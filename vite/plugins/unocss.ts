import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'

export default function createUnocss() {
  return Unocss({
    presets: [
      presetIcons({
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
      }),
    ],
  })
}
