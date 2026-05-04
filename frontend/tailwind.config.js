/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0d0221',
        'cyber-darker': '#1a0033',
        'cyber-cyan': '#00ffc8',
        'cyber-pink': '#ff00ff',
        'cyber-green': '#00ff88',
        'cyber-red': '#ff3366',
        'cyber-yellow': '#ffd700',
        'cyber-blue': '#0080ff',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-down': 'slide-down 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'glitch': 'glitch 0.3s infinite',
        'cyber-scan': 'cyber-scan 3s infinite',
        'scanlines': 'scanlines 8s linear infinite',
      },
      keyframes: {
        'cyber-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 255, 200, 0.5), 0 0 10px rgba(0, 255, 200, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 255, 200, 0.8), 0 0 30px rgba(0, 255, 200, 0.5)' 
          },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'glitch': {
          '0%': { textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff' },
          '20%': { textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff' },
          '40%': { textShadow: '-2px 0 #00ffff, 2px 0 #ff00ff' },
          '60%': { textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff' },
          '80%': { textShadow: '-2px 0 #00ffff, 2px 0 #ff00ff' },
          '100%': { textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff' },
        },
        'cyber-scan': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'scanlines': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(10px)' },
        },
      },
    },
  },
  plugins: [],
}
