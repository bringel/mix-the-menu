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
          50: '#F0FCF9',
          100: '#C6F7E9',
          200: '#8EEDD1',
          300: '#5FE3C0',
          400: '#2DCCA7',
          500: '#17B897',
          600: '#079A82',
          700: '#048271',
          800: '#016457',
          900: '#004440'
        },

        gray: {
          50: '#F7F7F7',
          100: '#E1E1E1',
          200: '#CFCFCF',
          300: '#B1B1B1',
          400: '#9E9E9E',
          500: '#7E7E7E',
          600: '#626262',
          700: '#515151',
          800: '#3B3B3B',
          900: '#222222'
        },
        accent2: {
          50: '#F5F5F7',
          100: '#EAEAEF',
          200: '#CBCBD8',
          300: '#ACACC0',
          400: '#6D6E90',
          500: '#2F3061',
          600: '#2A2B57',
          700: '#1C1D3A',
          800: '#15162C',
          900: '#0E0E1D'
        },
        accent: {
          50: '#F3F4F5',
          100: '#E6E8EC',
          200: '#C1C6CF',
          300: '#9BA3B3',
          400: '#515F79',
          500: '#061A40',
          600: '#05173A',
          700: '#041026',
          800: '#030C1D',
          900: '#020813'
        },

        yellow: {
          50: '#FFFBEA',
          100: '#FFF3C4',
          200: '#FCE588',
          300: '#FADB5F',
          400: '#F7C948',
          500: '#F0B429',
          600: '#DE911D',
          700: '#CB6E17',
          800: '#B44D12',
          900: '#8D2B0B'
        },
        red: {
          50: '#FFE3E3',
          100: '#FFBDBD',
          200: '#FF9B9B',
          300: '#F86A6A',
          400: '#EF4E4E',
          500: '#E12D39',
          600: '#CF1124',
          700: '#AB091E',
          800: '#8A041A',
          900: '#610316'
        }
      }
    },
    fontFamily: {
      header: ['Roboto Slab', ...defaultTheme.fontFamily.sans],
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
