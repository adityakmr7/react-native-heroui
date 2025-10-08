# Deploying Accordion Documentation to GitHub Pages

This directory contains the documentation for the Accordion component, ready to be deployed to GitHub Pages.

## Quick Start

### Option 1: Using the HTML Page

1. The `index.html` file provides a standalone documentation page
2. It automatically loads the markdown from `../README.md`
3. Features dark mode toggle and responsive design

### Option 2: Using Jekyll (GitHub Pages Default)

The `_config.yml` file configures Jekyll for GitHub Pages deployment.

## Deployment Steps

### Method 1: GitHub Pages from Repository

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Add Accordion documentation"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select your branch (usually `main`)
   - Set the folder to `/src/components/Accordion/docs`
   - Click "Save"

3. **Access Your Documentation**:
   - Your docs will be available at: `https://yourusername.github.io/rn-heroui/`

### Method 2: GitHub Pages from `docs` Folder (Recommended)

1. **Copy files to root docs folder**:

   ```bash
   # From repository root
   mkdir -p docs/components/accordion
   cp src/components/Accordion/README.md docs/components/accordion/
   cp src/components/Accordion/docs/index.html docs/components/accordion/
   cp src/components/Accordion/docs/_config.yml docs/
   ```

2. **Update paths in index.html**:
   - Change `fetch('../README.md')` to point to the correct location

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select branch and `/docs` folder
   - Save

### Method 3: Deploy to GitHub Pages Branch

1. **Install gh-pages**:

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add script to package.json**:

   ```json
   {
     "scripts": {
       "deploy:docs": "gh-pages -d src/components/Accordion/docs"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy:docs
   ```

## Directory Structure

```
Accordion/
├── Accordion.tsx           # Component source code
├── README.md              # Main documentation (Markdown)
└── docs/                  # GitHub Pages files
    ├── index.html         # Standalone HTML documentation page
    ├── _config.yml        # Jekyll configuration
    └── README.md          # This file
```

## Features

### HTML Documentation Page (`index.html`)

- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Navigation**: Sticky navigation with quick links
- ✅ **Markdown Rendering**: Automatically renders README.md
- ✅ **Syntax Highlighting**: Code blocks with proper formatting
- ✅ **Smooth Scrolling**: Enhanced navigation experience
- ✅ **Theme Persistence**: Remembers your theme preference

### Jekyll Configuration (`_config.yml`)

- ✅ **Cayman Theme**: Clean, professional GitHub theme
- ✅ **SEO Optimized**: Meta tags and sitemap
- ✅ **GFM Support**: GitHub Flavored Markdown
- ✅ **Syntax Highlighting**: Rouge for code blocks

## Customization

### Update Theme Colors

Edit the CSS in `index.html`:

```css
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change these colors to match your brand */
}
```

### Update Links

Replace placeholder links in both files:

- Change `yourusername` to your GitHub username
- Update repository URL
- Add your social media links

### Add Analytics

Uncomment and add your Google Analytics ID in `_config.yml`:

```yaml
google_analytics: UA-XXXXXXXXX-X
```

## Local Testing

### Test HTML Page Locally

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit: http://localhost:8000
```

### Test Jekyll Locally

1. **Install Jekyll**:

   ```bash
   gem install jekyll bundler
   ```

2. **Create Gemfile**:

   ```ruby
   source 'https://rubygems.org'
   gem 'github-pages', group: :jekyll_plugins
   ```

3. **Install dependencies**:

   ```bash
   bundle install
   ```

4. **Run locally**:

   ```bash
   bundle exec jekyll serve
   ```

5. **View**: http://localhost:4000

## Troubleshooting

### Documentation not loading?

- Check that README.md is in the correct location
- Verify file paths in index.html
- Check browser console for errors

### GitHub Pages not updating?

- Wait a few minutes (can take 5-10 minutes)
- Check GitHub Actions tab for build errors
- Verify GitHub Pages is enabled in Settings

### Styling issues?

- Clear browser cache
- Check if CDN links are accessible
- Verify CSS is loading correctly

## Advanced: Automated Deployment

Create a GitHub Action to auto-deploy docs:

```yaml
# .github/workflows/deploy-docs.yml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - 'src/components/Accordion/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./src/components/Accordion/docs
```

## Support

For issues or questions:

- Open an issue on GitHub
- Check the main repository README
- Contact the maintainers

---

**Happy documenting! 📚**
