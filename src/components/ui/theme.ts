import { createSystem, defaultConfig } from '@chakra-ui/react';

export default createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        background: {
          value: { base: '#FCFCFC', _dark: '#06060a' },
        },
        border: {
          primary: {
            value: { base: '#E0E0E0', _dark: '#333344' },
          },
        },
        tooltip: {
          value: { base: '#fafafa', _dark: '#222222' },
        },
        logo: {
          value: { base: '#161616', _dark: '#EDEDED' },
        },
        topNav: {
          linkLabel: {
            value: { base: '#161616', _dark: '#E9E9E9' },
          },
          linkLabelActive: {
            value: { base: '#30A46C', _dark: '#30A46C' },
          },
          linkLabelHover: {
            value: { base: '#5eaf88', _dark: '#5eaf88' },
          },
        },
        assetSelect: {
          background: {
            value: { base: '#ffffff', _dark: '#37353f' },
          },
          hover: {
            value: { base: '#f0f0f0', _dark: '#242424' },
          },
        },
        tabs: {
          background: {
            value: { base: 'transparent', _dark: 'transparent' },
          },
          color: {
            value: { base: '#161616', _dark: '#eeeeee' },
          },
          selected: {
            background: {
              value: { base: '#5ea9ff', _dark: '#5ea9ff' },
            },
            color: {
              value: { base: '#ffffff', _dark: '#000000' },
            },
          },
        },
        dialog: {
          backdrop: {
            value: { base: '#00000025', _dark: '#ffffff25' },
          },
        },
        alert: {
          success: {
            background: {
              value: { base: '#d9e9e8', _dark: '#005b54' },
            },
            color: {
              value: { base: '#0F766E', _dark: '#3ed38b' },
            },
            border: {
              value: { base: '#0F766E', _dark: '#0F766E' },
            },
          },
          info: {
            background: {
              value: { base: '#deebff', _dark: '#162350' },
            },
            color: {
              value: { base: '#2B6CB0', _dark: 'rgb(163, 207, 255)' },
            },
            border: {
              value: { base: '#2B6CB0', _dark: '#2B6CB0' },
            },
          },
          loading: {
            background: {
              value: { base: '#deebff', _dark: '#162350' },
            },
            color: {
              value: { base: '#2B6CB0', _dark: 'rgb(163, 207, 255)' },
            },
            border: {
              value: { base: '#2B6CB0', _dark: '#2B6CB0' },
            },
          },
          warning: {
            background: {
              value: { base: '#f6ddb7', _dark: '#6b4600' },
            },
            color: {
              value: { base: '#8a5a00', _dark: '#f0b864' },
            },
            border: {
              value: { base: '#ffce1d', _dark: '#9e6700' },
            },
          },
          error: {
            background: {
              value: { base: '#ecd9df', _dark: '#47121a' },
            },
            color: {
              value: { base: '#881337', _dark: '#ff928a' },
            },
            border: {
              value: { base: '#881337', _dark: '#881337' },
            },
          },
        },
        text: {
          primary: {
            value: { base: '#161616', _dark: '#E9E9E9' },
          },
          secondary: {
            value: { base: '#707070', _dark: '#b2b2b2' },
          },
          'green.9': {
            value: { base: '#009382', _dark: '#14b8a6' },
          },
          'gray.9': {
            value: { base: '#707070', _dark: '#8F8F8F' },
          },
          unit: {
            value: { base: '#5ea9ff', _dark: '#5ea9ff' },
          },
          link: {
            value: { base: '#2B6CB0', _dark: '#7AB7FF' },
          },
        },
        button: {
          // Primary button
          primary: {
            background: {
              value: { base: '#5ea9ff', _dark: '#5ea9ff' },
            },
            color: {
              value: { base: '#000000', _dark: '#000000' },
            },
            border: {
              value: { base: 'transparent', _dark: 'transparent' },
            },
            disabled: {
              background: {
                value: { base: '#89a5c488', _dark: '#89a5c488' },
              },
              color: {
                value: { base: '#000000', _dark: '#eeeeee' },
              },
            },
            hover: {
              background: {
                value: { base: '#8dc2ff', _dark: '#8dc2ff' },
              },
            },
          },
          // Secondary button
          secondary: {
            background: {
              value: { base: 'transparent', _dark: 'transparent' },
            },
            border: {
              value: { base: '#18181b', _dark: '#e7e7e4' },
            },
            color: {
              value: { base: '#18181b', _dark: '#e7e7e4' },
            },
            disabled: {
              background: {
                value: { base: 'transparent', _dark: 'transparent' },
              },
              color: {
                value: { base: '#18181b', _dark: '#e7e7e4' },
              },
            },
            hover: {
              background: {
                value: { base: '#f0f0f0', _dark: '#252525' },
              },
            },
          },
        },
        input: {
          background: {
            value: { base: '#ffffff', _dark: '#0c0c13' },
          },
          border: {
            value: { base: '#e0e0e0', _dark: '#333333' },
          },
          color: {
            value: { base: '#161616', _dark: '#e9e9e9' },
          },
        },
        divider: {
          value: { base: '#E0E0E0', _dark: '#505070' },
        },
        card: {
          background: {
            value: { base: '#FFFFFF', _dark: '#1a1a29' },
          },
          border: {
            value: { base: '#ececec', _dark: '#333333' },
          },
          boxShadow: {
            value: {
              base: 'rgba(0, 0, 0, 0.10)',
              _dark: 'rgba(150, 150, 150, 0.10)',
            },
          },
        },
        progress: {
          track: {
            value: { base: '#f0f0f0', _dark: '#333333' },
          },
        },
      },
    },

    tokens: {
      fonts: {
        heading: { value: 'var(--font-host-grotesk)' },
        body: { value: 'var(--font-host-grotesk)' },
      },
    },
  },
});
