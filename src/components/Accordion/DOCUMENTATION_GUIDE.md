# 📚 Accordion Component - Documentation Guide

Complete documentation package for the Accordion component, ready for GitHub Pages deployment.

## 📁 Documentation Structure

```
src/components/Accordion/
├── Accordion.tsx                      # Component source code
├── README.md                          # Main documentation (Markdown)
├── DOCUMENTATION_GUIDE.md            # This file
└── docs/                             # GitHub Pages deployment files
    ├── index.html                    # Standalone HTML documentation page
    ├── _config.yml                   # Jekyll configuration for GitHub Pages
    ├── README.md                     # Deployment instructions
    ├── preview-docs.sh               # Local preview script
    └── .github-workflow-example.yml  # Auto-deployment workflow example
```

## 🚀 Quick Start - Preview Documentation Locally

### Option 1: Using the Preview Script (Easiest)

```bash
cd src/components/Accordion/docs
./preview-docs.sh
```

Then open: http://localhost:8000

### Option 2: Manual Preview

```bash
cd src/components/Accordion/docs

# Using Python (usually pre-installed)
python3 -m http.server 8000

# OR using Node.js
npx http-server -p 8000

# OR using PHP
php -S localhost:8000
```

Then open: http://localhost:8000

## 📖 Documentation Features

### Main Documentation (`README.md`)

Comprehensive markdown documentation including:

✅ **Installation & Setup**

- Package installation instructions
- Import examples
- Basic setup with ThemeProvider

✅ **Usage Examples**

- Basic accordion
- With subtitles
- Multiple selection mode
- Compact mode
- All 4 variants (light, shadow, bordered, splitted)

✅ **Advanced Features**

- Default expanded keys
- Disabled items
- Start content (icons, badges)
- Custom indicators (static and dynamic)
- Hide indicators
- Controlled accordion
- Disable animations
- Custom styling

✅ **Complete API Reference**

- Accordion props table
- AccordionItem props table
- ClassNames interface
- IndicatorProps interface
- TypeScript type exports

✅ **Additional Sections**

- Accessibility features
- FAQ section
- Complete working examples
- TypeScript support guide
- Theme integration guide

### HTML Documentation Page (`docs/index.html`)

Beautiful, interactive documentation page with:

✅ **Modern Design**

- Beautiful gradient header
- Clean, professional layout
- Responsive design (mobile-friendly)
- GitHub-inspired styling

✅ **Dark Mode**

- Toggle between light/dark themes
- Theme preference saved in localStorage
- Smooth transitions

✅ **Navigation**

- Sticky navigation bar
- Quick links to sections
- Smooth scrolling
- Breadcrumb navigation

✅ **Features**

- Automatic markdown rendering from README.md
- Syntax highlighting for code blocks
- Responsive tables
- Mobile-optimized layout

## 🌐 Deploying to GitHub Pages

### Method 1: Direct Deployment (Recommended)

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Select your main branch
   - Folder: `/src/components/Accordion/docs`
   - Click Save

2. **Access your docs**:
   - URL: `https://yourusername.github.io/rn-heroui/`
   - (Replace `yourusername` with your GitHub username)

### Method 2: Using GitHub Actions (Automated)

1. **Copy the workflow file**:

   ```bash
   mkdir -p .github/workflows
   cp src/components/Accordion/docs/.github-workflow-example.yml \
      .github/workflows/deploy-docs.yml
   ```

2. **Commit and push**:

   ```bash
   git add .
   git commit -m "Add documentation and auto-deployment"
   git push origin main
   ```

3. **Documentation auto-updates**:
   - Every push to main branch automatically rebuilds docs
   - Changes to Accordion component trigger deployment
   - Manual trigger available in Actions tab

### Method 3: Custom Domain

1. **Add CNAME file**:

   ```bash
   echo "docs.yourdomain.com" > src/components/Accordion/docs/CNAME
   ```

2. **Configure DNS**:
   - Add CNAME record pointing to `yourusername.github.io`

3. **Enable in GitHub Settings**:
   - Pages → Custom domain → Enter your domain

## 🎨 Customization Guide

### Update Branding

**Edit `docs/index.html`**:

```html
<!-- Change header colors -->
<style>
  .header {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
  }
</style>

<!-- Update title and description -->
<div class="header">
  <h1>🎨 Your Component Name</h1>
  <p>Your description here</p>
</div>
```

### Update Links

**In `docs/index.html` and `docs/_config.yml`**:

Replace:

- `yourusername` → Your GitHub username
- `rn-heroui` → Your repository name
- Social media links
- Contact information

### Add Analytics

**Edit `docs/_config.yml`**:

```yaml
google_analytics: UA-XXXXXXXXX-X
```

### Custom Styling

Add custom CSS in `docs/index.html`:

```css
.markdown-body {
  /* Your custom styles */
  font-family: 'Your Font', sans-serif;
}
```

## 📱 Testing Checklist

Before deploying, test:

- [ ] Local preview works (run `preview-docs.sh`)
- [ ] All links are working
- [ ] Code examples render correctly
- [ ] Dark mode toggles properly
- [ ] Mobile responsive design looks good
- [ ] Navigation links jump to correct sections
- [ ] Images (if any) load correctly
- [ ] GitHub/social links point to correct URLs

## 🔧 Troubleshooting

### Docs not loading?

**Check:**

1. README.md path is correct in `index.html`
2. Browser console for JavaScript errors
3. Network tab for failed requests

**Fix:**

```javascript
// In index.html, update the fetch path if needed
const response = await fetch('./README.md'); // or '../README.md'
```

### GitHub Pages 404 error?

**Check:**

1. GitHub Pages is enabled in Settings
2. Correct branch and folder selected
3. Files are committed and pushed
4. Wait 5-10 minutes for initial deployment

### Styling broken?

**Check:**

1. CDN links are accessible
2. CSS is loading (check Network tab)
3. No conflicting styles

**Fix:**

```html
<!-- Verify these CDN links in index.html -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### Dark mode not persisting?

**Check:**

1. localStorage is enabled in browser
2. No browser extensions blocking storage

**Test in console:**

```javascript
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme'); // Should return 'dark'
```

## 📊 SEO Optimization

The documentation includes:

✅ **Meta Tags** (in `_config.yml`):

- Title and description
- Author information
- Social media cards

✅ **Sitemap**:

- Automatically generated by Jekyll
- Helps search engines index your docs

✅ **Semantic HTML**:

- Proper heading hierarchy
- Accessible navigation
- ARIA labels where needed

## 🎯 Best Practices

### Documentation Maintenance

1. **Keep README.md updated** when component changes
2. **Update examples** to reflect latest API
3. **Add migration guides** for breaking changes
4. **Version your docs** for major releases
5. **Test all code examples** before publishing

### GitHub Pages Tips

1. **Use relative links** for portability
2. **Optimize images** (if any) for web
3. **Test on multiple devices** and browsers
4. **Monitor page load speed**
5. **Keep markdown simple** for better rendering

## 📈 Analytics & Monitoring

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `_config.yml`:
   ```yaml
   google_analytics: UA-XXXXXXXXX-X
   ```

### Track Metrics

Monitor:

- Page views
- Time on page
- Popular sections
- Search queries (if search is enabled)
- Device/browser breakdown

## 🤝 Contributing to Documentation

### Guidelines

1. **Keep it simple**: Use clear, concise language
2. **Show examples**: Every feature should have a code example
3. **Be thorough**: Cover edge cases and gotchas
4. **Stay consistent**: Follow the existing format
5. **Test examples**: Ensure all code examples work

### Documentation Updates

When updating docs:

```bash
# 1. Edit README.md
vim src/components/Accordion/README.md

# 2. Preview locally
cd src/components/Accordion/docs
./preview-docs.sh

# 3. Commit changes
git add src/components/Accordion/README.md
git commit -m "docs: update Accordion documentation"

# 4. Push (auto-deploys if workflow is set up)
git push origin main
```

## 📦 Package for Distribution

To include docs in npm package:

**Add to `package.json`**:

```json
{
  "files": [
    "src/components/Accordion/Accordion.tsx",
    "src/components/Accordion/README.md",
    "lib/"
  ]
}
```

## 🌟 Enhancement Ideas

Future improvements:

- [ ] Add interactive code playground
- [ ] Include video tutorials
- [ ] Add downloadable examples
- [ ] Create Storybook integration
- [ ] Add search functionality
- [ ] Multi-language support
- [ ] API playground/tester
- [ ] Component generator
- [ ] Performance metrics
- [ ] Accessibility score

## 📞 Support

For help with documentation:

- 📖 [Main Repository](https://github.com/yourusername/rn-heroui)
- 🐛 [Report Issues](https://github.com/yourusername/rn-heroui/issues)
- 💬 [Discussions](https://github.com/yourusername/rn-heroui/discussions)
- 📧 Email: your@email.com

## 📄 License

Documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

Code examples in documentation follow the MIT License of the main project.

---

**Ready to deploy? 🚀**

1. Preview locally: `./preview-docs.sh`
2. Customize branding and links
3. Enable GitHub Pages
4. Share your beautiful docs!

---

Made with ❤️ for the React Native community
