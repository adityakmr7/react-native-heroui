import React from 'react';
import { HeroUIProvider } from '../src';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#000000',
      },
    ],
  },
};

export const decorators = [
  (Story, context) => {
    const theme =
      context.globals.backgrounds?.value === '#000000' ? 'dark' : 'light';

    return (
      <HeroUIProvider initialTheme={theme}>
        <div
          style={{
            padding: '20px',
            minHeight: '100vh',
            backgroundColor: context.globals.backgrounds?.value || '#ffffff',
          }}
        >
          <Story />
        </div>
      </HeroUIProvider>
    );
  },
];
