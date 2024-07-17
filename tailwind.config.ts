import type { Config } from 'tailwindcss'
import flowbite from 'flowbite-react/tailwind'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    flowbite.content(),
  ],
  prefix: '',
  theme: {
    button: {
      color: {
        primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      },
    },
    navbar: {
      link: {
        base: 'block py-2 pl-3 pr-4 md:p-0',
        active: {
          on: 'bg-purple-700 text-white dark:text-white md:bg-transparent md:text-purple-700',
          off: 'border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-white',
        },
        disabled: {
          on: 'text-gray-400 hover:cursor-not-allowed dark:text-gray-600',
          off: '',
        },
      },
    },
    pagination: {
      base: '',
      layout: {
        table: {
          base: 'text-sm text-gray-700 dark:text-gray-400',
          span: 'font-semibold text-gray-900 dark:text-white',
        },
      },
      pages: {
        selector: {
          active:
            'bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
        },
      },
    },
    timeline: {
      item: {
        point: {
          marker: {
            icon: {
              base: 'h-3 w-3 text-purple-600 dark:text-purple-300',
              wrapper:
                'absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 ring-8 ring-white dark:bg-purple-900 dark:ring-gray-900',
            },
          },
        },
      },
    },
    datepicker: {
      popup: {
        root: {
          base: 'absolute top-10 z-50 block pt-2',
          inline: 'relative top-0 z-auto',
          inner: 'inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700',
        },
        footer: {
          button: {
            base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-purple-300',
            today: 'bg-purple-700 text-white hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700',
          },
        },
      },
      views: {
        days: {
          items: {
            item: {
              selected: 'bg-purple-700 text-white hover:bg-purple-600',
            },
          },
        },
        months: {
          items: {
            item: {
              selected: 'bg-purple-700 text-white hover:bg-purple-600',
            },
          },
        },
        years: {
          items: {
            item: {
              selected: 'bg-purple-700 text-white hover:bg-purple-600',
            },
          },
        },
        decades: {
          items: {
            item: {
              selected: 'bg-purple-700 text-white hover:bg-purple-600',
            },
          },
        },
      },
    },
  },
  extend: {
    keyframes: {
      'tilt-slow': {
        '0%, 100%': { transform: 'rotate(0deg)' },
        '25%': { transform: 'rotate(45deg)' },
        '50%': { transform: 'rotate(0deg)' },
        '75%': { transform: 'rotate(-45deg)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'tilt-slow': 'tilt-slow 0.2s infinite',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
  },
  plugins: [require('tailwindcss-animate'), flowbite.plugin()],
} satisfies Config

export default config
