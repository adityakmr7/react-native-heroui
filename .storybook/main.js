module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-react-native-web',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../docs/images'],
  webpackFinal: async (config) => {
    const path = require('path');

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      // Use mocks for Reanimated and Gesture Handler on web
      'react-native-reanimated': path.resolve(
        __dirname,
        'mocks/react-native-reanimated.js'
      ),
      'react-native-gesture-handler': path.resolve(
        __dirname,
        'mocks/react-native-gesture-handler.js'
      ),
    };

    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    return config;
  },
};
