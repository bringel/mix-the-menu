const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        facebook: {
          default: '#1877F2',
          darker: '#166BDA'
        },
        google: {
          default: '#DB4437',
          darker: '#C53D32'
        },
        microsoft: {
          default: '#666666',
          darker: '#5C5C5C'
        },
        primary: {
          50: '#FEF7F5',
          100: '#FEEFEC',
          200: '#FCD8CF',
          300: '#FBC1B2',
          400: '#F79278',
          500: '#F4633E',
          600: '#DC5938',
          700: '#923B25',
          800: '#6E2D1C',
          900: '#491E13'
        },
        accent: {
          50: '#F5F6F9',
          100: '#EAECF3',
          200: '#CBD1E2',
          300: '#ACB5D0',
          400: '#6D7DAC',
          500: '#2F4589',
          600: '#2A3E7B',
          700: '#1C2952',
          800: '#151F3E',
          900: '#0E1529'
        },
        tertiary: {
          50: '#F5F9FB',
          100: '#EAF3F7',
          200: '#CBE2EB',
          300: '#ABD0DE',
          400: '#6DACC6',
          500: '#2E89AD',
          600: '#297B9C',
          700: '#1C5268',
          800: '#153E4E',
          900: '#0E2934'
        },
        gray: {
          50: '#FBFBFB',
          100: '#F7F7F7',
          200: '#ECEBEB',
          300: '#E1DFDE',
          400: '#CAC6C6',
          500: '#B3AEAD',
          600: '#A19D9C',
          700: '#6B6868',
          800: '#514E4E',
          900: '#363434'
        }
      }
    },
    fontFamily: {
      header: ['Oswald', ...defaultTheme.fontFamily.sans],
      body: ['Lato', ...defaultTheme.fontFamily.sans]
    },
    customForms: theme => ({
      default: {
        'input, select, textarea, multiselect': {
          paddingTop: theme('spacing.1'),
          paddingRight: theme('spacing.2'),
          paddingBottom: theme('spacing.1'),
          paddingLeft: theme('spacing.2'),
          '&:disabled': {
            backgroundColor: theme('colors.gray[100]')
          },
          '&[readonly]': {
            backgroundColor: theme('colors.gray[100]')
          }
        },
        'checkbox, radio': {
          color: theme('colors.accent.400'),
          '&:disabled': {
            backgroundColor: theme('colors.gray[100]')
          },
          '&:disabled + *': {
            color: theme('colors.gray[600]')
          },
          '&:disabled:checked': {
            backgroundColor: theme('colors.gray[500]')
          }
        }
      }
    })
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
  experimental: {
    uniformColorPalette: true
  }
};
