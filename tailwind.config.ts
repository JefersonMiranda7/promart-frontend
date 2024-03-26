import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { //cambiar nombres
        myYellow: '#ffcb9a',
        myLightGreen: '#d1e8e2',
        myOrange: '#d37f36',
        myGreen: '#116466'
      },
      backgroundColor: {
        myGreenBg: '#116466',
        myYellowBg: '#ffcb9a',
        myOrangeBg: '#d37f36'
      }
    }
  },
  plugins: [],
}
export default config
