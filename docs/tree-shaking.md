# Tree-Shaking Guide

React Native HeroUI is designed with tree-shaking in mind, ensuring you only bundle the components you actually use.

## What is Tree-Shaking?

Tree-shaking is a term for dead code elimination. When you import components from a library, modern bundlers analyze your imports and only include the code you're actually using in your final bundle.

## How It Works

### ✅ Automatic Optimization

```tsx
// You import
import { Button, Card, Avatar } from 'react-native-heroui';

// Bundler includes ONLY these 3 components
// The other 18+ components are automatically removed
```

### Bundle Size Comparison

| Scenario                      | Bundle Size (minified + gzipped) |
| ----------------------------- | -------------------------------- |
| Import 1 component (`Button`) | ~5-8 KB                          |
| Import 5 components           | ~20-25 KB                        |
| Import 10 components          | ~40-50 KB                        |
| Import all 21 components      | ~60-80 KB                        |

> These are approximate sizes and include the shared theme utilities.

## Best Practices

### ✅ DO: Named Imports

**Option 1: Single line**

```tsx
import { Button, Card, Avatar } from 'react-native-heroui';
```

**Option 2: Multiple lines**

```tsx
import { Button } from 'react-native-heroui';
import { Card } from 'react-native-heroui';
import { Avatar } from 'react-native-heroui';
```

Both approaches work equally well for tree-shaking.

### ❌ DON'T: Namespace Imports

```tsx
// Bad - May prevent tree-shaking in some bundlers
import * as HeroUI from 'react-native-heroui';
const { Button, Card } = HeroUI;
```

### ❌ DON'T: Default Imports

```tsx
// Wrong - Library doesn't export a default
import HeroUI from 'react-native-heroui'; // ❌ Error
```

## Component Dependencies

React Native HeroUI components are architected to minimize dependencies:

### Shared Code (~2-3 KB)

These utilities are shared by all components and included once:

- `useTheme` hook
- `ThemeProvider` context
- Theme type definitions

### Component-Specific Code

Each component only imports:

- Its own implementation
- Shared utilities (theme)
- No other components

Example: `Button` component doesn't import `Card`, `Avatar`, etc.

## Supported Bundlers

Tree-shaking works automatically with:

### React Native

- ✅ **Metro** (default React Native bundler)
- ✅ **Expo** (uses Metro)

### Web

- ✅ **Next.js** (with React Native Web)
- ✅ **Webpack 5+**
- ✅ **Vite**
- ✅ **Rollup**
- ✅ **esbuild**

## Verifying Bundle Size

### React Native Apps

Use React Native Bundle Visualizer:

```bash
# Install
npm install --save-dev react-native-bundle-visualizer

# Analyze your bundle
npx react-native-bundle-visualizer
```

This opens an interactive visualization showing:

- What's in your bundle
- Size of each component
- Dependencies between modules

### React Native Web

Use webpack-bundle-analyzer:

```bash
# Install
npm install --save-dev webpack-bundle-analyzer

# Add to your webpack config
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
```

## Advanced: Understanding the Package

### Package Structure

```
react-native-heroui/
├── lib/
│   ├── module/           # ES Modules (tree-shakeable)
│   │   ├── index.js      # Main entry point
│   │   ├── components/   # Individual components
│   │   ├── hooks/        # Shared hooks
│   │   └── utils/        # Shared utilities
│   └── typescript/       # Type definitions
└── package.json
```

### package.json Configuration

```json
{
  "main": "lib/module/index.js",
  "module": "lib/module/index.js",
  "types": "lib/typescript/src/index.d.ts",
  "sideEffects": false
}
```

The `"sideEffects": false` tells bundlers that no files have side effects, making tree-shaking more aggressive.

## FAQ

### Q: Do I need to configure my bundler?

**A:** No! Tree-shaking works automatically with Metro (React Native's default bundler) and other modern bundlers.

### Q: Can I use `import { Button } from 'react-native-heroui/button'`?

**A:** Not currently, but it's not needed. Named imports from the main package already provide optimal tree-shaking.

### Q: Why is my bundle size larger than expected?

**A:** Check:

1. Are you using `import *` instead of named imports?
2. Are you in development mode? (Production builds are smaller)
3. Are you measuring minified + gzipped size?

### Q: How do separate component packages compare?

**A:** Some libraries offer separate packages like `@library/button`, `@library/card`. We chose a single package because:

- Modern tree-shaking makes separate packages unnecessary
- Simpler to install and manage
- No version conflicts between component packages
- Better developer experience

### Q: Are there any components I should avoid importing?

**A:** No! All components are optimized. Import what you need without worrying about size.

### Q: What about peer dependencies?

**A:** Only `react` and `react-native` which you already have in your project. No hidden dependencies that could bloat your bundle.

## Performance Tips

1. **Import only what you use** - Don't import entire component sets if you only need one
2. **Use production builds** - Run `react-native bundle` with `--dev false`
3. **Enable Hermes** - React Native's Hermes engine optimizes bundle size
4. **Measure regularly** - Use bundle analyzers to track size over time

## Real-World Example

### Before Optimization

```tsx
// Importing everything "just in case"
import {
  Button, Card, Avatar, Badge, Chip, Switch,
  Spinner, Skeleton, Radio, RadioGroup, Slider,
  Select, Progress, Image, Spacer, Input,
  Textarea, Divider, Accordion, Alert, Toast
} from 'react-native-heroui';

// Only using 3 components
<Button />
<Card />
<Avatar />
```

**Bundle size:** ~60-80 KB

### After Optimization

```tsx
// Import only what you use
import { Button, Card, Avatar } from 'react-native-heroui';

<Button />
<Card />
<Avatar />
```

**Bundle size:** ~12-15 KB (4-5x smaller!)

## Conclusion

Tree-shaking with React Native HeroUI is:

- ✅ **Automatic** - No configuration needed
- ✅ **Efficient** - Only bundle what you use
- ✅ **Simple** - Just use named imports
- ✅ **Transparent** - Use bundle analyzers to verify

Focus on building great apps, and let the bundler handle optimization!

---

**Need help?** Check out our [documentation](./README.md) or [open an issue](https://github.com/adityakmr7/react-native-heroui/issues).
