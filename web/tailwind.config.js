/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    typography: require('./typography'),
    extend: {
      colors: {
        white: '#141F39',
        gray: {
          25: '#FCFCFD',
          // 50: '#F9FAFB',
          // 100: '#F3F4F6',
          // 200: '#E5E7EB',
          100: '#2E3F60',
          200: '#142949',
          50: '#142949',
          300: '#D1D5DB',
          400: '#9CA3AF',
          // 500: '#6B7280',
          500: '#98AAD1',
          // 700: '#374151',
          700: '#98AAD1',
          // 800: '#1F2A37',
          800: '#FFFFFF',
          // 900: '#111928',
          900: '#FFFFFF',
        },
        dark: {
          0: '#FFFFFF',
          10: '#98AAD1',
          15: '#167CEC', // 导航激活背景色
          25: '#0A1523', // 弹窗背景色
          30: '#2E3F60', // boerder边框颜色
          100: '#02081F', // 创作区背景色
          110: '#071331',
          120: '#142949', // 弹窗背景
          150: '#323C4D',
          180: '#163F6C', // tooltip背景
          190: '#0A1523', // 工作区背景色
          200: '#141F39', // 悬浮背景色和创作区盒子背景色
          210: '#132338', // 工作流背景色
          1000: '#0A1226', // 登录页form表单整体背景色
        },
        primary: {
          25: '#F5F8FF',
          // 50: '#EBF5FF',
          50: '#142949',
          100: '#E1EFFE',
          200: '#C3DDFD',
          300: '#A4CAFE',
          400: '#528BFF',
          500: '#2970FF',
          600: '#1C64F2',
          700: '#1A56DB',
        },
        blue: {
          500: '#E1EFFE',
        },
        green: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          800: '#03543F',

        },
        yellow: {
          100: '#FDF6B2',
          800: '#723B13',
        },
        purple: {
          50: '#F6F5FF',
          200: '#DCD7FE',
        },
        indigo: {
          25: '#F5F8FF',
          50: '#EEF4FF',
          100: '#E0EAFF',
          300: '#A4BCFD',
          400: '#8098F9',
          600: '#444CE7',
          800: '#2D31A6',
        },
      },
      screens: {
        mobile: '100px',
        // => @media (min-width: 100px) { ... }
        tablet: '640px', // 391
        // => @media (min-width: 600px) { ... }
        pc: '769px',
        // => @media (min-width: 769px) { ... }
      },
      boxShadow: {
        'xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        'sm': '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
        'md': '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)',
        'lg': '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
        'xl': '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
        '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
