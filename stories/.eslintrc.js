module.exports = {
  rules: {
    // Allow inline styles in stories for clarity and readability
    'react-native/no-inline-styles': 'off',
    // Allow alerts in stories for demonstrations
    'no-alert': 'off',
    // Stories often have render functions with hooks - this is acceptable in Storybook
    'react-hooks/rules-of-hooks': 'off',
  },
};

