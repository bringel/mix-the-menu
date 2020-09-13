const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
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
          100: '#EBFAEB',
          200: '#CCF2CC',
          300: '#AEEAAE',
          400: '#71DB71',
          500: '#34CB34',
          600: '#2FB72F',
          700: '#1F7A1F',
          800: '#175B17',
          900: '#103D10'
        },
        accent: {
          100: '#E6FAFE',
          200: '#C1F3FE',
          300: '#9BECFD',
          400: '#51DEFB',
          500: '#06D0F9',
          600: '#05BBE0',
          700: '#047D95',
          800: '#035E70',
          900: '#023E4B'
        },
        tertiary: {
          100: '#FEF6E6',
          200: '#FCE8C0',
          300: '#FADA9A',
          400: '#F6BE4E',
          500: '#F2A202',
          600: '#DA9202',
          700: '#916101',
          800: '#6D4901',
          900: '#493101'
        },
        error: {
          100: '#FDECEC',
          200: '#FAD0D0',
          300: '#F7B4B4',
          400: '#F07B7B',
          500: '#EA4343',
          600: '#D33C3C',
          700: '#8C2828',
          800: '#691E1E',
          900: '#461414'
        }
      }
    },
    fontFamily: {
      header: ['Lato', ...defaultTheme.fontFamily.sans],
      body: defaultTheme.fontFamily.sans
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
  plugins: [require('@tailwindcss/custom-forms')]
};
