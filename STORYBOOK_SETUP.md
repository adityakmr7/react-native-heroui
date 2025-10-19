# Storybook Setup Guide

This guide explains how to set up, run, and deploy Storybook for React Native HeroUI.

## ✅ What's Been Set Up

The following has been configured for you:

### 1. Configuration Files

- `.storybook/main.js` - Main Storybook configuration
- `.storybook/preview.js` - Story decorators and global settings
- `.storybook/preview-head.html` - Custom HTML head content

### 2. Story Files

- `stories/Button.stories.tsx` - Button component stories
- `stories/Input.stories.tsx` - Input component stories
- `stories/Card.stories.tsx` - Card component stories
- `stories/Theming.stories.tsx` - Theme system showcase
- `stories/README.md` - Stories documentation

### 3. Scripts

Added to `package.json`:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build -o docs/storybook"
  }
}
```

### 4. Dependencies

Added to `devDependencies`:

- `@storybook/react-webpack5` - Storybook for React
- `@storybook/addon-essentials` - Core Storybook addons
- `@storybook/addon-react-native-web` - React Native Web support
- `react-native-web` - Web rendering for RN components
- `react-dom` - Required for web rendering

### 5. GitHub Actions

- `.github/workflows/deploy-storybook.yml` - Auto-deploy to GitHub Pages

### 6. Documentation

- Updated `docs/index.html` with Storybook link
- Updated `docs/README.md` with playground section

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
# Install all dependencies including Storybook
yarn install

# or if you have issues
yarn install --force
```

### Step 2: Run Storybook

```bash
yarn storybook
```

This will:

- Start Storybook at `http://localhost:6006`
- Open it in your default browser
- Enable hot-reloading for changes

### Step 3: Explore Stories

Navigate to:

- **Components/Button** - See all button variants
- **Components/Input** - Explore input variations
- **Components/Card** - View card examples
- **Theme/Theming System** - Interactive theme showcase

## 🎨 Using Storybook

### Interactive Controls

1. Select a story from the sidebar
2. Use the "Controls" panel at the bottom to:
   - Change props in real-time
   - Toggle boolean values
   - Select from dropdown options
   - Enter text values

### Theme Switching

1. Click the background icon (🎨) in the toolbar
2. Switch between "light" and "dark" backgrounds
3. Components automatically adapt to the theme

### Responsive Testing

1. Click the viewport icon (📱) in the toolbar
2. Select different device sizes
3. Test component responsiveness

## 📦 Building for Production

### Build Static Site

```bash
yarn build-storybook
```

This creates a static build in `docs/storybook/` that can be deployed anywhere.

### Test the Build Locally

```bash
# Install a simple HTTP server
npm install -g serve

# Serve the built Storybook
serve docs/storybook
```

Visit `http://localhost:3000` to test the production build.

## 🌐 Deploying to GitHub Pages

### Automatic Deployment

Storybook is automatically deployed when you push to `main` branch:

1. Push your changes:

   ```bash
   git add .
   git commit -m "Update Storybook"
   git push origin main
   ```

2. GitHub Actions will:
   - Build Storybook
   - Deploy to GitHub Pages
   - Make it available at: `https://yourusername.github.io/react-native-heroui/storybook/`

### Manual Deployment

```bash
# Build Storybook
yarn build-storybook

# Commit and push
git add docs/storybook
git commit -m "Build Storybook"
git push
```

### Enable GitHub Pages

If not already enabled:

1. Go to repository **Settings** → **Pages**
2. Source: Deploy from a branch
3. Branch: `main` or `release/0.6.0`
4. Folder: `/ (root)` or `/docs`
5. Save

## ✍️ Writing New Stories

### Create a Story File

```tsx
// stories/YourComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../src/components/YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'custom'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Playground: Story = {
  render: (args) => <YourComponent {...args} />,
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <YourComponent variant="default">Default</YourComponent>
      <YourComponent variant="custom">Custom</YourComponent>
    </View>
  ),
};
```

### Story Best Practices

1. **Playground Story** - Interactive version with all controls
2. **Variant Stories** - Show different variants side-by-side
3. **State Stories** - Loading, disabled, error states
4. **Real-World Examples** - Practical use cases

## 🔧 Configuration

### Customize Storybook

Edit `.storybook/main.js`:

```js
module.exports = {
  // Add more story locations
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)', // Include src stories
  ],

  // Add more addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y', // Accessibility testing
  ],
};
```

### Customize Theme

Edit `.storybook/preview.js`:

```js
export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#000000' },
      { name: 'custom', value: '#f0f0f0' }, // Add custom background
    ],
  },
};
```

## 🐛 Troubleshooting

### Port Already in Use

If port 6006 is taken:

```bash
yarn storybook --port 6007
```

### Module Not Found Errors

Make sure imports are from source:

```tsx
// ✅ Correct
import { Button } from '../src/components/Button/Button';

// ❌ Wrong
import { Button } from 'react-native-heroui';
```

### Reanimated/Gesture Handler Issues

The config includes web aliases, but if you have issues:

```bash
# Clear cache and restart
yarn storybook --no-manager-cache
```

### Build Fails

```bash
# Clean and rebuild
rm -rf node_modules/.cache
rm -rf docs/storybook
yarn build-storybook
```

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook Addons](https://storybook.js.org/addons)

## 🎯 Next Steps

1. **Run Storybook**: `yarn storybook`
2. **Explore existing stories**: See Button, Input, Card examples
3. **Create stories for more components**: Add stories for remaining 24 components
4. **Customize**: Add your own story variants and examples
5. **Deploy**: Push to main branch to auto-deploy to GitHub Pages

## 💡 Tips

- Use the "Docs" tab to see auto-generated documentation
- Use the "Actions" panel to test component callbacks
- Use the "Accessibility" addon to check a11y compliance
- Create a matrix story to show all variant/color combinations
- Add MDX files for rich documentation with embedded stories

## 🤝 Contributing

When adding new components:

1. Create corresponding story files
2. Include all variants and states
3. Add interactive controls
4. Document usage patterns
5. Test in both light and dark themes

---

**Storybook is now set up and ready to use!** 🎉

Run `yarn storybook` to get started, then visit `http://localhost:6006`
