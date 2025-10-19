# React Native HeroUI Storybook Stories

This directory contains Storybook stories for React Native HeroUI components.

## What is Storybook?

Storybook is an interactive development environment and documentation tool that allows you to:

- View components in isolation
- Interact with component props in real-time
- Test different component states
- Explore all component variants visually

## Structure

```
stories/
├── Button.stories.tsx       # Button component stories
├── Input.stories.tsx        # Input component stories
├── Card.stories.tsx         # Card component stories
├── Theming.stories.tsx      # Theme system showcase
└── README.md               # This file
```

## Running Storybook

### Development Mode

Start Storybook in development mode:

```bash
yarn storybook
```

This will start Storybook at `http://localhost:6006`

### Build for Production

Build a static version for deployment:

```bash
yarn build-storybook
```

This creates a static build in `docs/storybook/` that can be deployed to any static hosting service.

## Writing Stories

### Basic Story Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../src/components/YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  argTypes: {
    // Define controls for props
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
  args: {
    // Default prop values
  },
};
```

### Best Practices

1. **Organize by Category**: Use the `title` field to organize stories
   - `Components/Button`
   - `Forms/Input`
   - `Theme/Colors`

2. **Use ArgTypes**: Define controls for interactive props

   ```tsx
   argTypes: {
     size: {
       control: { type: 'select' },
       options: ['sm', 'md', 'lg'],
     },
   }
   ```

3. **Multiple Variants**: Create separate stories for each major use case

   ```tsx
   export const Variants: Story = { ... }
   export const Sizes: Story = { ... }
   export const Colors: Story = { ... }
   ```

4. **Add Documentation**: Use parameters to add descriptions
   ```tsx
   parameters: {
     docs: {
       description: {
         story: 'Description of this variant',
       },
     },
   }
   ```

## Features

### Theme Support

All stories automatically use the HeroUIProvider and support theme switching:

- Click the background toggle in Storybook to switch between light/dark
- Components automatically adapt to the theme

### Controls

Interactive prop controls allow you to:

- Change component props in real-time
- Test different combinations
- See immediate visual feedback

### Responsive Preview

Use Storybook's viewport addon to test components at different screen sizes.

## Adding New Stories

1. Create a new `.stories.tsx` file in this directory
2. Import your component from `../src/`
3. Define the meta configuration
4. Export story variants
5. Run `yarn storybook` to see your stories

Example:

```tsx
// stories/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from '../src/components/NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'Components/NewComponent',
  component: NewComponent,
};

export default meta;
type Story = StoryObj<typeof NewComponent>;

export const Default: Story = {
  args: {
    // props here
  },
};
```

## Deployment

Storybook is automatically deployed to GitHub Pages when you push to the main branch.

**Live URL**: `https://yourusername.github.io/react-native-heroui/storybook/`

The GitHub Actions workflow:

1. Installs dependencies
2. Builds Storybook
3. Deploys to GitHub Pages

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook Addons](https://storybook.js.org/docs/react/essentials/introduction)

## Troubleshooting

### "Module not found" errors

Make sure you're importing from the source directory:

```tsx
// ✅ Good
import { Button } from '../src/components/Button/Button';

// ❌ Bad
import { Button } from 'react-native-heroui';
```

### Reanimated/Gesture Handler issues

The Storybook config includes aliases for React Native Web compatibility. If you encounter issues:

1. Check `.storybook/main.js` webpack configuration
2. Ensure react-native-web is installed
3. Clear cache and restart: `yarn storybook --no-manager-cache`

### Styling issues

If components don't render correctly:

1. Check that HeroUIProvider is wrapping your stories (should be automatic via decorators)
2. Verify theme is being applied
3. Test in the actual app to isolate Storybook-specific issues

## Contributing

When adding new components to the library:

1. Create stories for the new component
2. Include examples of all variants and states
3. Add interactive controls for key props
4. Document usage in story descriptions
